async function getLastModifiedTimeGithub(owner, repo, filePath) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&per_page=1`;
    
    try {
        const response = await fetch(url);
        if (response.ok) {
            const commitData = await response.json();
            if (commitData.length > 0) {
                const lastCommit = commitData[0];
                const lastModifiedTime = lastCommit.commit.committer.date;
                return lastModifiedTime;
            } else {
                return "No commits found for this file.";
            }
        } else {
            return `Error: ${response.status}`;
        }
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

const owner = "SadeekFarhan21";
const repo = "College_Notes";
const filePath = "index.html";  // Ensure this path is relative to the repository root

getLastModifiedTimeGithub(owner, repo, filePath).then(lastModifiedTime => {
    if (!lastModifiedTime.startsWith("Error") && !lastModifiedTime.startsWith("No commits found")) {
        const parsedTime = new Date(lastModifiedTime);
        const formattedTime = parsedTime.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        console.log(formattedTime);
    } else {
        console.log(lastModifiedTime);
    }
});
