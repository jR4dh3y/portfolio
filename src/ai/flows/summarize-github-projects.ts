// Summarize Github Projects
'use server';
/**
 * @fileOverview Summarizes key GitHub projects and contributions using AI.
 *
 * - summarizeGithubProjects - A function that generates a summary of GitHub projects.
 * - SummarizeGithubProjectsInput - The input type for the summarizeGithubProjects function.
 * - SummarizeGithubProjectsOutput - The return type for the summarizeGithubProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGithubProjectsInputSchema = z.object({
  githubProfileLink: z
    .string()
    .describe('The link to the GitHub profile to summarize.'),
  projectExamples: z
    .string()
    .describe('Example projects to use to get context about user.')
});
export type SummarizeGithubProjectsInput = z.infer<
  typeof SummarizeGithubProjectsInputSchema
>;

const SummarizeGithubProjectsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the key GitHub projects and contributions.'),
});
export type SummarizeGithubProjectsOutput = z.infer<
  typeof SummarizeGithubProjectsOutputSchema
>;

export async function summarizeGithubProjects(
  input: SummarizeGithubProjectsInput
): Promise<SummarizeGithubProjectsOutput> {
  return summarizeGithubProjectsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGithubProjectsPrompt',
  input: {schema: SummarizeGithubProjectsInputSchema},
  output: {schema: SummarizeGithubProjectsOutputSchema},
  prompt: `You are an AI expert at summarizing GitHub profiles and projects.

  Given the GitHub profile link: {{{githubProfileLink}}}
  And given project examples: {{{projectExamples}}}

  Generate a concise and engaging summary of the user's key projects and contributions, suitable for display on a portfolio website.  Focus on the impact and technologies used in the projects. The summary should be no more than 150 words.
  `,
});

const summarizeGithubProjectsFlow = ai.defineFlow(
  {
    name: 'summarizeGithubProjectsFlow',
    inputSchema: SummarizeGithubProjectsInputSchema,
    outputSchema: SummarizeGithubProjectsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
