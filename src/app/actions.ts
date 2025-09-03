'use server';

import {
  summarizeGithubProjects,
  type SummarizeGithubProjectsInput,
} from '@/ai/flows/summarize-github-projects';
import { z } from 'zod';

const formSchema = z.object({
  githubProfileLink: z.string().url({ message: 'Please enter a valid URL.' }),
  projectExamples: z.string().optional(),
});

type State = {
  summary: string;
  error: string;
};

export async function generateSummaryAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const validatedFields = formSchema.safeParse({
      githubProfileLink: formData.get('githubProfileLink'),
      projectExamples: formData.get('projectExamples'),
    });

    if (!validatedFields.success) {
      return {
        summary: '',
        error: validatedFields.error.flatten().fieldErrors.githubProfileLink?.[0] || 'Invalid input.',
      };
    }
    
    const input: SummarizeGithubProjectsInput = {
      githubProfileLink: validatedFields.data.githubProfileLink,
      projectExamples: validatedFields.data.projectExamples || '',
    };
    
    const result = await summarizeGithubProjects(input);

    if (result.summary) {
      return { summary: result.summary, error: '' };
    } else {
      return { summary: '', error: 'Failed to generate summary. Please try again.' };
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { summary: '', error: `An error occurred: ${errorMessage}` };
  }
}
