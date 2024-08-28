export default function Docs() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center text-white">
      <div className="text-lg">
        <h1 className="text-4xl font-bold mb-4">Understanding Key Blockchain Metrics</h1>
        <p className="mb-4 text-gray-100">
          Blockchain technology relies on various metrics to measure performance, efficiency, and user engagement.
          Understanding these metrics helps in evaluating the health and scalability of a blockchain network. In this
          blog post, we'll dive into some key blockchain metrics and their significance.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Daily Transaction Count</h2>
          <p className="text-gray-100">
            The daily transaction count represents the total number of transactions that are processed by the blockchain
            network within a 24-hour period. This metric is crucial for understanding the network's usage and load. A
            high transaction count suggests high user activity and adoption, whereas a lower count might indicate lower
            engagement or usage.
          </p>
          <p className="text-gray-100">
            Tracking the daily transaction count over time can also help identify trends, such as growth in network
            activity or seasonal variations. It is an essential metric for assessing the overall performance and
            capacity needs of the blockchain.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Block Count</h2>
          <p className="text-gray-100">
            The block count is the total number of blocks that have been added to the blockchain since its inception.
            Each block contains a collection of transactions and serves as a record of those transactions. The block
            count provides insights into the blockchain's age, growth, and history.
          </p>
          <p className="text-gray-100">
            An increasing block count signifies ongoing network activity and transaction processing. It also impacts the
            blockchain’s data storage requirements and may influence the network's performance and scalability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Average Block Time</h2>
          <p className="text-gray-100">
            Average block time measures the average duration between the creation of consecutive blocks. This metric is
            crucial for understanding how quickly transactions are confirmed and added to the blockchain. A shorter
            average block time generally leads to faster transaction confirmations and better user experience.
          </p>
          <p className="text-gray-100">
            Variations in average block time can occur due to network congestion, changes in block size, or algorithm
            adjustments. It's a key factor in evaluating the blockchain's efficiency and responsiveness.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Average Block Size</h2>
          <p className="text-gray-100">
            Average block size refers to the typical size of a block in bytes. This metric indicates how much data
            (i.e., transactions) each block can hold. Larger block sizes can accommodate more transactions per block but
            may also lead to increased network load and potential performance issues.
          </p>
          <p className="text-gray-100">
            Monitoring average block size helps in understanding the network’s capacity and storage requirements. It is
            also critical for optimizing blockchain performance and addressing scalability challenges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Active Accounts</h2>
          <p className="text-gray-100">
            Active accounts refer to the number of unique accounts that engage with the blockchain within a specific
            timeframe. This metric reflects the user base of the network and provides insights into adoption and
            engagement levels.
          </p>
          <p className="text-gray-100">
            A higher number of active accounts suggests a growing and active user community, which can drive network
            activity and transaction volume. It is a key indicator of the blockchain's popularity and user engagement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Average Gas Price</h2>
          <p className="text-gray-100">
            Average gas price measures the typical cost required to execute a transaction or smart contract on the
            blockchain, expressed in gwei or another unit of measure. This metric affects the transaction fees paid by
            users and can influence network behavior.
          </p>
          <p className="text-gray-100">
            Changes in average gas price can reflect shifts in network demand, transaction volume, and congestion. Lower
            gas prices typically encourage more transactions, while higher prices might lead to reduced activity or
            alternative solutions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Daily Deployed Contracts</h2>
          <p className="text-gray-100">
            This metric indicates the number of new smart contracts deployed on the blockchain each day. It reflects the
            level of development and innovation occurring within the network.
          </p>
          <p className="text-gray-100">
            A higher count of deployed contracts suggests increased activity in creating and launching new decentralized
            applications (dApps) or functionalities. This can drive network growth and enhance its ecosystem.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">TPS (Transactions Per Second) per Day</h2>
          <p className="text-gray-100">
            Transactions Per Second (TPS) measures the number of transactions the blockchain can process each second.
            This metric is crucial for evaluating the network’s capacity to handle high transaction volumes and its
            scalability.
          </p>
          <p className="text-gray-100">
            A higher TPS value indicates a more capable network that can manage a larger volume of transactions, which
            is essential for supporting widespread adoption and high-performance applications.
          </p>
        </section>
      </div>
    </div>
  );
}
