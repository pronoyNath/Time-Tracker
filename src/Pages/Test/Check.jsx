import { useEffect, useState } from "react";

function Check() {
    const [start, setStart] = useState(false);
    const [stop, setStop] = useState(false);
    const [sec, setSec] = useState(0);
    const [timerSting, setTimerString] = useState('')

    useEffect(() => {
        const date = new Date(0);
        date.setSeconds(sec)

        setTimerString(date.toISOString().slice(11, 19))
    })

    useEffect(() => {
        let timer = null;
        if (start & !stop) {
            timer = setInterval(() => {
                setSec(sec => sec + 1)
            }, 1000)
        }
        else if (stop) {
            clearInterval(timer)
        }
        return () => {
            clearInterval(timer)
        }
    }, [start, stop])

    const handleStart = () => {
        setStop(false)
        setStart(true)
    }

    const handleStop = () => {
        setStart(start => !start)
        setStop(stop => !stop)

    }

    const handleReset = () => {
        setSec(0)
        setStart(false)
        setStop(false)
    }



    return (
        <div className="m-52">
            <h1>watch</h1>
            <p>{sec}</p>
            <p>{timerSting}</p>
            <button className="btn" onClick= { handleStart }>Start</button>
            <button className="btn" onClick= { handleStop }>stop</button>
            <button className="btn" onClick= { handleReset }>reset</button>

        </div>
    )
}

export default Check;