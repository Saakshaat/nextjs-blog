import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), "posts");

function postDataHelper(params) {
  const fileNames = fs.readdirSync(postsDirectory);

  if (params.empty) {
    const allPostsData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf-8");

      const matterData = matter(fileContents);

      return {
        id,
        matterData,
      };
    }).sort((a, b) => a.matterData.data.date < b.matterData.data.date);

    return allPostsData;
  } else if (Object.keys(params.id).length !== 0) {
    const fullPath = path.join(postsDirectory, `${params.id}.md`);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterData = matter(fileContents);

    // Combine the data with the id
    return {
      id: params.id,
      matterData,
    };
  } else {
    throw Error("nope");
  }
}

export function getSortedPostsData() {
  const allPosts = postDataHelper({ empty: true, func: "getSortedPostsData" });
  const allPostsBriefData = allPosts.map((post) => {
    return {
      id: post.id,
      ...post.matterData.data,
    };
  });

  return allPostsBriefData.sort((first, second) => first.date < second.data);
}

export function getAllPostIds() {
  const allPosts = postDataHelper({
    empty: true,
    func: "getAllPostIds",
  });

  return allPosts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export async function getPostData(id) {
  const postData = postDataHelper({ id, empty: false, func: "getPostData" });
  const matterData = postData.matterData

  const processedContent = await remark().use(html).process(matterData.content)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...postData.matterData.data,
  };
}
