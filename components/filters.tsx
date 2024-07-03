export const Filters = () => {
  return (
    <div className='flex items-center gap-4 mb-8'>
      <div className='flex items-center gap-2'>
        <label className='text-sm text-white'>Filter by</label>
        <select className='text-sm text-white bg-white/10 rounded-sm px-2 py-1'>
          <option value=''>All</option>
          <option value=''>Income</option>
          <option value=''>Expense</option>
        </select>
      </div>
      <div className='flex items-center gap-2'>
        <label className='text-sm text-white'>Sort by</label>
        <select className='text-sm text-white bg-white/10 rounded-sm px-2 py-1'>
          <option value=''>Newest</option>
          <option value=''>Oldest</option>
        </select>
      </div>
    </div>
  )
}
