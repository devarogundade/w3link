const Countdown = {
    start: function (to, callback) {
        let fnc = function () {
            let from = Date.now()
            let distance = to - from

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            let text = `${days}d : ${hours}h : ${minutes}min`;
            callback(text)

            if (distance < 0) {
                let text = `0d : 0h : 0min`;
                callback(text)
                clearInterval(interval);
            }
        }
        let interval = setInterval(fnc, 10000)
        fnc()
    },
    startOnlyDay: function(to, callback) {
        let fnc = function () {
            let from = Date.now()
            let distance = to - from

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            callback(days)

            if (distance < 0) {
                callback(0)
                clearInterval(interval);
            }
        }
        let interval = setInterval(fnc, 60000)
        fnc()
    },
    toDate: function(timestamp) {
        var a = new Date(timestamp)
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var month = months[a.getMonth()]
        var date = a.getDate()
        var hour = a.getHours()
        var min = a.getMinutes()   
        var year = a.getFullYear()
        return `${hour}:${min}, ${date} ${month} ${year.toString().replace('20', '')}`;
    }
}

export default Countdown