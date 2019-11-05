var players = [];

module.exports = {
    push(player) {
        players.push(player)
    },
    getAll() {
        return players;
    }
}