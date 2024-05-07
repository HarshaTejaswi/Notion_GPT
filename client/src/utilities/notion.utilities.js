import OpenAI from "openai";
import { Client } from "@notionhq/client";
// import fetch from "node-fetch";
// import zlib from 'zlib'

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const notion = new Client({ auth: 'secret_tJ1lnPL4EXkFM8kc67ulGzQW3eKqPEPz6Ncu0JBKqa6' });
const notionToken = process.env.NOTION_API_KEY;
const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const redirectUri = process.env.OAUTH_REDIRECT_URI;

let globalResponse = [];

function getSystemContent(templateType) {
    let systemContent;
    const map = {
        'carrerCoach': "You are a career coach & mentor. You need to provide proper guidance on the questions I ask."
    };
    systemContent = map[templateType.isLowerCase()] ?? 'Not found';
    return systemContent;
}

// async function generateOutput(gptQuery, systemContent) {
//     const chatCompletion = await openai.chat.completions.create({
//         messages: [
//             { role: "system", content: systemContent },
//             { role: "user", content: gptQuery },
//         ],
//         temperature: 0.7,
//         model: "gpt-3.5-turbo",
//     });
//     return chatCompletion.choices[0].message.content;
// }

export async function createTemplate(databaseId, pageId, gptQuery, template = null) {
    try {
        // const system_content = getSystemContent(template);
        // const output = await generateOutput(gptQuery, system_content);
        // console.log(output);
        let output = "Learning Python in just two weeks can be a challenging task as it is a comprehensive programming language. However, with diligent effort and the right resources, you can make significant progress. Here's a suggested roadmap for your two-week Python learning journey: Week 1: Day 1: Introduction and Setup - Watch this YouTube video on Python introduction: [Link: https://www.youtube.com/watch?v=rfscVS0vtbw] - Set up your Python environment by installing Python and a code editor like Visual Studio Code or PyCharm. Day 2-3: Python Basics - Start with the basics of Python syntax, variables, and data types. - Follow this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=Z1Yd7upQsXY] - Complete the exercises and practice writing simple Python programs. Day 4-5: Control Flow and Functions - Learn about if-else statements, loops, and functions in Python. - Watch this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=rfscVS0vtbw&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3] - Practice writing programs involving control flow and functions. Day 6: Data Structures - Familiarize yourself with Python's built-in data structures like lists, tuples, dictionaries, and sets. - Refer to this online tutorial: [Link: https://www.w3schools.com/python/python_lists.asp] - Practice using these data structures in simple programs. Week 2: Day 7: File Handling and Modules - Learn how to read from and write to files in Python. - Refer to this online tutorial: [Link: https://www.tutorialspoint.com/python/python_files_io.htm] - Understand the concept of modules and how to import them into your programs. Day 8-9: Object-Oriented Programming (OOP) - Dive into the concept of OOP in Python, including classes, objects, inheritance, and polymorphism. - Watch this YouTube playlist: [Link: https://www.youtube.com/watch?v=JeznW_7DlB0&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU] - Practice implementing OOP principles in Python programs. Day 10-11: Intermediate Concepts - Explore more advanced topics like error handling (try-except), regular expressions, and working with external libraries. - Follow this online tutorial: [Link: https://www.learnpython.org/] - Complete the interactive exercises to reinforce your understanding. Day 12-13: Web Development with Python - Learn the basics of web development using Python frameworks like Flask or Django. - Follow this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=MwZwr5Tvyxo] - Create a simple web application using Python. Day 14: Review and Projects - Review the concepts you have learned so far and identify any areas of weakness. - Challenge yourself with small Python projects to solidify your understanding. - Join online coding platforms like LeetCode or HackerRank to practice problem-solving. Remember, learning Python in two weeks requires consistent practice and dedication. Adjust the pace according to your learning style and allocate sufficient time each day. Utilize online documentation, forums, and the Python community to seek help and clarify doubts. Good luck with your Python learning journey! Learning Python in just two weeks can be a challenging task as it is a comprehensive programming language. However, with diligent effort and the right resources, you can make significant progress. Here's a suggested roadmap for your two-week Python learning journey: Week 1: Day 1: Introduction and Setup - Watch this YouTube video on Python introduction: [Link: https://www.youtube.com/watch?v=rfscVS0vtbw] - Set up your Python environment by installing Python and a code editor like Visual Studio Code or PyCharm. Day 2-3: Python Basics - Start with the basics of Python syntax, variables, and data types. - Follow this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=Z1Yd7upQsXY] - Complete the exercises and practice writing simple Python programs. Day 4-5: Control Flow and Functions - Learn about if-else statements, loops, and functions in Python. - Watch this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=rfscVS0vtbw&list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3] - Practice writing programs involving control flow and functions. Day 6: Data Structures - Familiarize yourself with Python's built-in data structures like lists, tuples, dictionaries, and sets. - Refer to this online tutorial: [Link: https://www.w3schools.com/python/python_lists.asp] - Practice using these data structures in simple programs. Week 2: Day 7: File Handling and Modules - Learn how to read from and write to files in Python. - Refer to this online tutorial: [Link: https://www.tutorialspoint.com/python/python_files_io.htm] - Understand the concept of modules and how to import them into your programs. Day 8-9: Object-Oriented Programming (OOP) - Dive into the concept of OOP in Python, including classes, objects, inheritance, and polymorphism. - Watch this YouTube playlist: [Link: https://www.youtube.com/watch?v=JeznW_7DlB0&list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU] - Practice implementing OOP principles in Python programs. Day 10-11: Intermediate Concepts - Explore more advanced topics like error handling (try-except), regular expressions, and working with external libraries. - Follow this online tutorial: [Link: https://www.learnpython.org/] - Complete the interactive exercises to reinforce your understanding. Day 12-13: Web Development with Python - Learn the basics of web development using Python frameworks like Flask or Django. - Follow this tutorial series on YouTube: [Link: https://www.youtube.com/watch?v=MwZwr5Tvyxo] - Create a simple web application using Python. Day 14: Review and Projects - Review the concepts you have learned so far and identify any areas of weakness. - Challenge yourself with small Python projects to solidify your understanding. - Join online coding platforms like LeetCode or HackerRank to practice problem-solving. Remember, learning Python in two weeks requires consistent practice and dedication. Adjust the pace according to your learning style and allocate sufficient time each day. Utilize online documentation, forums, and the Python community to seek help and clarify doubts. Good luck with your Python learning journey!"
        if (output.length > 2000) {
            console.log("-------------------1");
            globalResponse = await createPagesWithBlocks(output, '10603c5a72034be8bdce32bc53d4c9a9');
            console.log("-------------------3");
        }
        else {
            globalResponse = await createPage(output);
        }

        // Access globalResponse or perform other operations here
        // console.log(globalResponse);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function createPage(data, pageId='10603c5a72034be8bdce32bc53d4c9a9') {
    console.log("**************************");
    const response = await notion.pages.create({
        parent: {
            type: "page_id",
            page_id: pageId,
        },
        properties: {
            title: [
                {
                    text: {
                        content: "JavaScript Roadmap",
                    },
                },
            ],
        },
        children: [
            {
                object: "block",
                heading_2: {
                    rich_text: [
                        {
                            text: {
                                content: "Roadmap to learn JavaScript in 2 weeks",
                            },
                        },
                    ],
                },
            },
            {
                object: "block",
                paragraph: {
                    rich_text: [
                        {
                            text: {
                                content: data,
                            },
                        },
                    ],
                    color: "default",
                },
            },
        ],
    });

    return response;
}

async function createPagesWithBlocks(output, newPageId = '10603c5a72034be8bdce32bc53d4c9a9') {
    console.log("==============2");
    const pages = [];
    // const blockResponse = [];
    let len = output.length;
    let s = output;
    
    while (len > 0) {
        const dataChunk = s.substring(0, 2000);
        if (pages.length === 0) {
            console.log("==============4");
            const firstPageResponse = await createPage(dataChunk);
            console.log(firstPageResponse);
            pages.push(firstPageResponse);
            console.log("==============4 End");
        } else {
            console.log("==============5");
            const lastPageId = pages[pages.length - 1].id;
            console.log("lastpageId ====== ");
            console.log(lastPageId );
            const blockResponse = await appendBlockToPage(dataChunk, lastPageId);
            console.log(blockResponse);
        }

        s = s.substring(2000, len);
        len -= 2000;
    }

    return pages;
}

async function appendBlockToPage(data, pageId='10603c5a72034be8bdce32bc53d4c9a9') {
    const response = await notion.blocks.children.append({
        block_id: pageId,
        children: [
            {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                    rich_text: [
                        {
                            text: {
                                content: data,
                            },
                        },
                    ],
                },
            },
        ],
    });

    return response;
}