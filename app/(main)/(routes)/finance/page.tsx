import TotalBalance from "@/components/finance/total-balance";
import TransactionLog from "@/components/finance/transaction-log";

const Page = () => {
  return (
    <div className='flex flex-col gap-y-5'>
      <TotalBalance />
      <TransactionLog />
    </div>
  )
}

export default Page;