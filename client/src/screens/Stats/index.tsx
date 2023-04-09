import React, { useEffect, useState } from 'react'
import StatsController from '../../controllers/StatController';
import Stat from '../../models/Stats';
type Props = {

}

type StatModel = {

}

const Stats = (props: Props) => {

    const [stats, setStats] = useState<Stat[]>();

    useEffect(() => {
        async function run() {

            const stats = await StatsController.getStats();

            console.log("STATS: ", stats)
        }
        run();
    }, [])
    return (
        <div>Stats</div>
    )
}

export default Stats