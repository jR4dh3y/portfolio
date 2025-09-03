'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { generateSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Bot, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState = {
  summary: '',
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Generate AI Summary
    </Button>
  );
}

export function GithubSummaryForm() {
  const [state, formAction] = useFormState(generateSummaryAction, initialState);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-dashed">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-lg">
            <Bot className="text-primary" />
            AI-Powered GitHub Summary
          </CardTitle>
          <CardDescription>
            Enter a public GitHub profile URL to generate a summary of projects and contributions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="githubProfileLink" className="sr-only">GitHub Profile URL</label>
            <Input
              id="githubProfileLink"
              name="githubProfileLink"
              type="url"
              placeholder="https://github.com/username"
              required
              defaultValue="https://github.com/google/generative-ai-docs"
            />
          </div>
          <div>
            <label htmlFor="projectExamples" className="sr-only">Project Examples</label>
            <Textarea
              id="projectExamples"
              name="projectExamples"
              placeholder="Optionally, provide examples of key projects to focus on (e.g., 'My-Awesome-Project, Another-Repo')."
              rows={2}
              defaultValue="examples/typescript/google-ai-generative-language-chat"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          
          {state?.error && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state?.summary && (
            <div className="w-full rounded-md border bg-background p-4 text-sm animate-in fade-in-50">
              <h4 className="font-semibold mb-2">Generated Summary:</h4>
              <p className="text-muted-foreground">{state.summary}</p>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
