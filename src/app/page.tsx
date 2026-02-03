import PageContent from '@/components/page-content';
import { getGitHubProfile } from '@/lib/github';

export default async function Home() {
  const profilePictureUrl = await getGitHubProfile('jr4dh3y');
  return <PageContent profilePictureUrl={profilePictureUrl} />;
}
