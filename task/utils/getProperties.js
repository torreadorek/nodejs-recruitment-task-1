

module.exports = (line) => {
    const [timestamp,uuid,type] = line.matchAll(/[^\[]+(?=])/g)
    const message = line.substr(line.lastIndexOf(']')+2)
    return [timestamp[0],uuid[0],type[0],message]
}