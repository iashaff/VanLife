export default function Income() {
    const transactionsData = [
        { amount: 720, date: "Jan 3, '23", id: "1" },
        { amount: 560, date: "Dec 12, '22", id: "2" },
        { amount: 980, date: "Dec 3, '22", id: "3" },
        { amount: 850, date: "Jun 5, '23", id: "4" },
        { amount: 980, date: "Oct 15, '24", id: "5" },
    ]
    return (
        <section className="host-income">
            <div className="transactions-sum">
                <div>
                    <h1>Income</h1>
                    <h2>$4,940</h2>
                </div>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="info-header">
                <h3>Your transactions</h3>
            </div>
            <div className="transactions-block">
                {transactionsData.map((item) => (
                    <div key={item.id} className="transaction">
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}