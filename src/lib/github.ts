export async function getGitHubProfile(username: string): Promise<string> {
  const fallbackAvatar = `https://avatars.githubusercontent.com/${username}`;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) return fallbackAvatar;
    const data = await response.json();
    return data.avatar_url ?? fallbackAvatar;
  } catch {
    return fallbackAvatar;
  }
}
