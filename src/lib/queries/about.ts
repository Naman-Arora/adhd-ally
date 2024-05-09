const projId = "55701159";

const contributors = [
  {
    name: "Naman Arora",
    altname: "na",
    role: "Software Developer: Fullstack",
    bio: "I'm a sophomore computer science major at the University of Texas at Austin and enjoy spending time with friends and working out.",
    image: "/people/naman.jpg",
    issues: 0,
    commits: 0,
    unittests: 0,
  },
  {
    name: "Haoyu Joshua Fan",
    altname: "Haoyu Fan",
    role: "Software Developer: Fullstack",
    bio: "I am a junior computer science major at the University of Texas at Austin and enjoy working out and playing volleyball with friends.",
    image: "/people/joshua.jpg",
    issues: 0,
    commits: 0,
    unittests: 8,
  },
  {
    name: "Abdallah H Al-Sukhni",
    altname: "as",
    role: "Software Developer: Fullstack",
    bio: "I'm a junior computer science major at the University of Texas at Austin and enjoy hanging out and playing video games with my friends.",
    image: "/people/pictureswe.jpg",
    issues: 0,
    commits: 0,
    unittests: 11,
  },
  {
    name: "Tejaswi Thapa",
    altname: "tt",
    role: "Software Developer: Fullstack",
    bio: "I'm a junior computer science major at the University of Texas at Austin and enjoy walking dogs.",
    image: "/people/tejaswi.png",
    issues: 0,
    commits: 0,
    unittests: 10,
  },
  {
    name: "Faith Nguyen",
    altname: "fn",
    role: "Software Developer: Fullstack",
    bio: "I'm a sophomore computer science major at the University of Texas at Austin and enjoy watching cat videos.",
    image: "/people/faith.jpg",
    issues: 0,
    commits: 0,
    unittests: 10,
  },
];

export async function getAboutData() {
  let totalCommits = 0;
  let totalIssues = 0;
  let totalUnitTests = 0;

  const issuesResponse = await fetch(
    `https://gitlab.com/api/v4/projects/${projId}/issues?state=closed&per_page=100`
  );
  const issuesData = await issuesResponse.json();

  for (const c of contributors) {
    let { name } = c;
    let commitsCount = 0;
    let issuesCount = 0;
     
    for (const issue of issuesData) {
      if (issue.closed_by.name === name || issue.closed_by.name === c.altname) {
        issuesCount++;
      }
    }
    for (let pageNumber = 1; pageNumber <= 4; pageNumber++) {
      const commitRes = await fetch(
        `https://gitlab.com/api/v4/projects/${projId}/repository/commits?author_name=${name}&per_page=100&page=${pageNumber}`
      );
      const commitsData = await commitRes.json();

      for (const commit of commitsData) {
        if (commit.author_name === name) {
          commitsCount++;
        }
      }
    }
    c.issues = issuesCount;
    c.commits = commitsCount;
     
    totalCommits += commitsCount;
    totalIssues += issuesCount;
    totalUnitTests += c.unittests;
  }

  return {
    totalCommits,
    totalIssues,
    totalUnitTests,
    contributors,
  };
}
