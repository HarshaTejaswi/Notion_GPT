const fs = require('fs');
const { notionService } = require("../services/index.service.js");

const addDatabase = async (request, response) => {
    const pageId = request.body.pageId;
    const title = request.body.databaseName;

    try {
        const result = await notionService.createDatabase(pageId, title);
        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
};

const addPage = async (request, response) => {
    const { databaseID, pageName, header } = request.body

    try {
        const result = await notionService.createPage(databaseID, pageName, header);
        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
};

const appendBlock = async (request, response) => {
    const { pageID, content } = request.body

    try {
        const result = await notionService.appendBlocks(pageID, content);
        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
};

const addComments = async (request, response) => {
    const { pageID, comment } = request.body;

    try {
        const result = await notionService.createComments(pageID, comment);
        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
};

const returnPageWithNecessaryDetails = (obj, pageTitle) => {
    pagesList = [];

    if( obj.parent.type === "workspace" ){
        pageList.push({
            pageId: obj.id,
            pageTitle: pageTitle?.title?.title?.[0].text?.content || 'undefinedPageTitle',
            databaseId: "workspace",
        });
    }else{
        // Page present in Database...
        pageList.push({
            pageId: obj.id,
            pageTitle: pageTitle?.Name?.title?.[0].text?.content || 'undefinedPageTitle',
            databaseId: obj.parent.database_id
        });
    }


    return pagesList;
}



const getAllDatabaseList = async (request, response) => {
    const databasesURL = 'https://api.notion.com/v1/databases';
    const dbList = [];
    const { access_token } = request.params;

    try {
        const notionResponse = await fetch(databasesURL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2021-05-13',
            },
        });

        const data = await notionResponse.json();
        console.log(data);
        fs.writeFile('./src/data/d2.txt',  JSON.stringify(data), (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
            console.log('Data has been written to file');
          });
        const results = data.results;

        results?.forEach((obj) => {
            dbList.push({
                databaseId: obj.id,
                databaseTitle: obj.title?.[0]?.text?.content || 'Untitled',
            });
        });

        response.json({ data: dbList });

    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'An error occurred while fetching the databases.' });
    }
};

async function getAllPageList(request, response) {
    const workspaceURL = 'https://api.notion.com/v1/search';
    const pageList = [];
    const { access_token } = request.params;

    try {
        const notionResponse = await fetch(workspaceURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2021-05-13',
            },
            body: JSON.stringify({
                query: "",
                filter: {
                    "property": "object",
                    "value": "page"
                }
            })
        });

        const data = await notionResponse.json();
        console.log( data );
        fs.writeFile('./src/data/p2.txt', JSON.stringify(data), (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
            console.log('Data has been written to file : P1');
          });
        console.log( data );
        const results = data.results;

        results?.forEach((obj) => {
            const pageTitle = obj?.properties;
            if (typeof (pageTitle) !== 'undefined') {
                // returnPageWithNecessaryDetails( obj, pageTitle );
                // console.log(`------------ Inside ${obj.id} -------------------- `)
                // console.log(pageTitle?.title?.title?.[0].text?.content || pageTitle?.Name?.title?.[0]?.text?.content ||"---");
                if( obj.parent.type === "workspace" ){
                    pageList.push({
                        pageId: obj.id,
                        pageTitle: pageTitle?.title?.title?.[0]?.text?.content || 'undefinedPageTitle'
                    });
                }
                else if( obj.parent.type === "page_id" ){
                    pageList.push({
                        pageId: obj.id,
                        pageTitle: pageTitle?.title?.title?.[0]?.text?.content || 'undefinedPageTitle',
                        ParentPageID: obj.parent.page_id
                    });
                }
                {
                    // Page present in Database...
                    pageList.push({
                        pageId: obj.id,
                        pageTitle: pageTitle?.Name?.title?.[0]?.text?.content || 'undefinedPageTitle',
                        ParentDatabaseId: obj.parent.database_id
                    });
                }    
            }
        });

        response.json({ data: pageList });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function template(request, response) {
    const {
        database,
        page,
        title,
        gptQuery,
        context,
        accessToken } = request.body;
    try {
        const result = await notionService.createTemplate(database, page, title, gptQuery, context, accessToken);
        response.json(result);
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
}

async function oauthCreateToken(request, response) {
    const { auth_code } = request.body;
    try {
        console.log("Inside oauth ");
        await notionService.CreateToken(auth_code)
        .then(result => {
            response.json({data: {access_token : result}});
        })
        .catch(error => {
            console.error("Error fetching access token in controllers :", error);
        });
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
}

async function saveContext(request, response) {
    const { contextData, contextTitle, accessToken } = request.body;
    console.log("access_token : ",accessToken)
    try {
        const result = await notionService.savecontextInDb(contextData, contextTitle, accessToken);
        response.status(200).json({
            message: `Saved Context inside DB successfully: ${result}`
        })
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
}

async function getContext(request, response) {
    const {access_token} = request.params;
    console.log("access_token inside getContext : ", access_token)
    try {
        const result = await notionService.getAllContexts(access_token);
        response.status(200).json({
            data:  result
        })
    } catch (error) {
        response.status(500).json({
            message: error.message,
        });
    }
}

module.exports = {
    notionController: {
        getAllDatabaseList,
        getAllPageList,
        addDatabase,
        addPage,
        appendBlock,
        addComments,
        template,
        oauthCreateToken,
        saveContext,
        getContext
    },
};