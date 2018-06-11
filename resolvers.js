const axios = require('axios');
let parseString = require('xml2js').parseString;

const config = {
    auth: {
        username: "taubew.hfu",  //taubew userId = 77725698 / beckerth userId = 2193293313
        password: "geheim01"
    }
};


const resolvers = {
    Query: {
        Katalog(parent,args,context,info){
            const felixKatalog = "https://felix.hs-furtwangen.de/restapi/repo/entries/";
            return axios.get(felixKatalog + args.key, config)
                .then(res => res.data);
        },
        Kataloge(parent,args,context,info){
            const felixKataloge = "https://felix.hs-furtwangen.de/restapi/repo/entries";
            return axios.get(felixKataloge, config)
                    .then(res => {
                    return res.data;
        });
        },
        Veranstaltungen(parent,args,context,info){
            const intraCourses = `https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/liste`;
            
            let intraConfig = {
                auth:{
                username:context.request.headers.username,
                password:context.request.headers.intrapassword
                }
            }
            console.log("TEST")
            return axios.get(intraCourses, intraConfig)
                .then(res => {
                    console.log(res.data.veranstaltungen)
                    return res.data.veranstaltungen;
                });
        },
        Veranstaltungsdetails(parent,args,context,info){
            const intraCourse = `https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/${args.id}`;
            let intraConfig = {
                auth:{
                username:context.request.headers.username,
                password:context.request.headers.intrapassword
                }
            }
            return axios.get(intraCourse, intraConfig)
                .then(res => {
                    console.log(res.data.veranstaltung[0]);
                    return res.data.veranstaltung[0];
                });
        },
        Kurse(parent,args,context,info){
            const felixMyCourses = `https://felix.hs-furtwangen.de/restapi/users/${args.userId}/courses/my`;
                return axios.get(felixMyCourses, config)
                        .then(res => {
                        console.log(res.data);
                        return res.data;
            });
        },
        Kurs(parent,args,context,info){
            const kurs = "https://felix.hs-furtwangen.de/restapi/repo/courses/";
                return axios.get(kurs + args.key, config)
                        .then(res => {
                        console.log(res.data);
                        return res.data
                    });
        },
        Folders(parent,args,context,info){
            const folder = `https://felix.hs-furtwangen.de/restapi/repo/courses/${args.courseKey}/elements/folder`;
            return axios.get(folder, config)
                    .then(res => {
                        console.log(res.data.folders);
                        return res.data.folders[0];
                    });
        },
        Files(parent,args,context,info){
            const files = args.href || `https://felix.hs-furtwangen.de/restapi/repo/courses/${args.courseKey}/elements/folder/${args.courseNodeId}/files`;
            return axios.get(files, config)
                .then(res => {
                    console.log(res);
                    return res.data;
                });
        },
        Posts(parent,args,context,info){
            const posts = `https://felix.hs-furtwangen.de/restapi/repo/courses/${args.courseKey}/elements/forum/${args.courseNodeId}/forum/threads`;
                return axios.get(posts, config)
                    .then(res => {
                        console.log(res.data);
                        return res.data;
                    });
        },
        Postings(parent,args,context,info){
            const postings = `https://felix.hs-furtwangen.de/restapi/repo/courses/${args.courseKey}/elements/forum/${args.courseNodeId}/forum/posts/${args.key}`;
            return axios.get(postings, config)
                    .then(res => {
                        console.log(res);
                        return res.data;
                    });
        },
        Forum(parent,args,context,info){
            const forum = `https://felix.hs-furtwangen.de/restapi/repo/courses/${args.courseKey}/elements/forum`;
            return axios.get(forum, config)
                .then(res => {
                    console.log(res.data);
                    return res.data.forums[0];
                });
        },
        IntranetFiles(parent,args,context,info){
            let intraConfig = {
                auth:{
                username:context.request.headers.username,
                password:context.request.headers.intrapassword
                }
            }
            const files =`https://www.dm.hs-furtwangen.de/dm.php?template=projects_foldercontent&projectid=${args.id}&folderid=&orderby=veroeffentlichungsdatum`;
                return axios.get(files, intraConfig)
                    .then(res => {
                        let final = [];
                        let xml = String(res.data).replace('<meta http-equiv="content-type" content="text/html; charset=utf-8" />', '');
                        parseString(xml, function (err, result) {
                            result.rss.channel[0].item.forEach((item,idx)=>{
                                let obj = {};
                                obj.title = item.title[0];
                                obj.link = item.link[0];
                                let description = item.description[0].split("<br >");
                                console.log(description);
                                obj.size = description[0];
                                obj.uploadInfo = description[1];
                                obj.description = description[2];
                                final.push(obj);
                            });
                        });
                        return final;
                    });
        },
        News(parent,args,context,info){
            console.log(context.request.headers.newslink);
            const news = context.request.headers.newslink;
                return axios.get(news, config)
                    .then(res => {
                        let final = [];
                        // var eintraege = [];
                       parseString(res.data, function (err, result) {
                            result.rss.channel[0].item.forEach((item,idx)=>{
                                let news = {};

                                for (let prop in item) {
                                    news[prop] = item[prop][0];
                                }
                                var title = news['title'];
                                var description = news['description'];
                                if(description != "Mit diesem Link gelangen Sie zu FELIX."){
                                    // console.log(description);
                                    var short_description = description.split("<ul class='list-unstyled'><li>");
                                    short_description = short_description[1].split("</ul>");
                                    short_description = short_description[0].split("</li><li>");
                                    short_description.forEach(function(element) {
                                        let finalNews = {};
                                        var date_time=element.split("<span class='o_nowrap o_date'>am ");
                                        var date_time=date_time[1].split("</span>");
                                        var date_time=date_time[0];
                                        var date= date_time.slice(0, 10);
                                        var time= date_time.slice(11, 17);
                                        
                                        var link=element.split('href="');
                                        link=link[1].split('"');
                                        
                                        
                                        var message=element.split(">");
                                        var message=message[3].split("</a");
                                        
                                        var autor=message[1];
                                        var message=message[0];
                                        

                                        finalNews.sortDate = date[3]+date[4]+" "+date[0]+date[1]+", "+ date[6]+date[7]+date[8]+date[9]+" "
                                            +time[0]+time[1]+":"
                                            +time[3]+time[4]+":00";
                                        finalNews.message = message;
                                        finalNews.date = date;
                                        finalNews.time = time;
                                        finalNews.title = title;
                                        finalNews.link = link[0];
                                        final.push(finalNews);
                                    });
                                }
                                
                            });
                            
                        });
                        final.sort(function(a, b) {
                            var dateA = new Date(a.sortDate), dateB = new Date(b.sortDate);
                            console.log(dateA);
                            return dateB - dateA;
                        });


                        console.log(final);
                        return final;
                    });
        }
    }
}
export default resolvers;