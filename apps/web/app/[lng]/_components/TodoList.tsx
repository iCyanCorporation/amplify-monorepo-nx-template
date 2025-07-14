'use client';

import { useState, useEffect } from 'react';
import { amplifyClient as client } from '@/lib/amplifyClient';
import type { Schema } from '@/data-schema';
import { Button } from '@packages/shadcn';
import { cn } from '@packages/shadcn';

export default function TodoList() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => {
        setTodos([...data.items]);
        setIsLoading(false);
      },
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  async function createTodo() {
    if (!newTodo.trim()) return;

    try {
      await client.models.Todo.create({
        content: newTodo.trim(),
      });
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      await client.models.Todo.delete({ id });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo List</h1>
          <p className="text-muted-foreground">
            Organize your tasks efficiently with AWS Amplify Gen 2
          </p>
        </div>

        {/* Add Todo Form */}
        <div className="mb-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className={cn(
                  'flex-1 rounded-md border border-input bg-background px-3 py-2',
                  'text-sm ring-offset-background placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              />
              <Button type="submit" disabled={!newTodo.trim()}>
                Add Todo
              </Button>
            </form>
          </div>
        </div>

        {/* Todo List */}
        <div className="rounded-lg border bg-card shadow-sm">
          {isLoading ? (
            <div className="p-6">
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted animate-pulse rounded" />
                ))}
              </div>
            </div>
          ) : todos.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No todos yet
              </h3>
              <p className="text-muted-foreground">
                Add your first todo above to get started!
              </p>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-2">
                {todos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-lg',
                      'border border-border bg-background/50 hover:bg-accent/50',
                      'transition-colors duration-200'
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-foreground flex-1">
                        {todo.content}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        <div className="mt-8 rounded-lg border bg-green-50 dark:bg-green-950/10 p-4 text-center">
          <div className="text-2xl mb-2">🥳</div>
          <p className="text-sm text-green-800 dark:text-green-400 mb-2">
            App successfully hosted! Try creating a new todo above.
          </p>
          <a
            href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/"
            className="text-sm text-green-600 dark:text-green-400 hover:underline"
          >
            Review next steps of this tutorial →
          </a>
        </div>
      </div>
    </div>
  );
}
