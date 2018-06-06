const { gql } = require('apollo-server');
const typeDefs = gql`
type Query {
    Kataloge: [Kurs]
    Katalog(key: String): Kurs
    Veranstaltungen: [Veranstaltungen]
    Veranstaltungsdetails(id: String): Veranstaltung
    Kurse(userId: String): [Kurs]
    Kurs(key: String): Kurs
    Folders(courseKey: String): Folder
    Files(
    href: String,
    courseKey: String,
    courseNodeId: String): [File]
    Posts(courseKey: String, courseNodeId: String): [Post]
    Postings(
    courseKey: String,
    courseNodeId: String,
    key: String): [Postings]
    Forum(courseKey: String): Forum
    IntranetFiles(id: String): [IntranetFile]
    News: [News]
}
type Kurs{
    authors: String
    description: String
    displayName: String
    olatResourceId: String
    displayname: String
    key: String
}
type Veranstaltung{
    name: String
    short: String
    vinfo: String
    id: String
    block: String
}
type Veranstaltungen{
    name: String
    short: String
    id: String
}
type Folder{
    detailsName: String
    courseNodeId: String
    name: String
}
type File{
    href: String
    title: String
    size: String
}
type IntranetFile{
    title: String
    link: String
    size: String
    uploadInfo: String
    description: String
}
type Post{
    key: String
    title: String
    body: String
    author: String
}
type Postings{
    key: String
    title: String
    body: String
    author: String
}
type News{
    title: String
    sortDate: String
    message: String
    date: String
    time: String
    link: String
}
type Forum{
    detailsName: String
    courseKey: String
    courseNodeId: String
    subscribed: String
}
`;

export default typeDefs;