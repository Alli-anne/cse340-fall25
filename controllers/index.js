const personName = (req, rest, next) => {
    rest.json(`Isabella Price`)
} 
const coolName = (req, rest, next) => {
    rest.json(`Carter Price`)
}
module.exports = {personName, coolName};