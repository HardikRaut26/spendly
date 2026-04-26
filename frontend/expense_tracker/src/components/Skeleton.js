import React from 'react';

/**
 * Reusable skeleton loading component with shimmer animation.
 */
const Skeleton = ({ width = '100%', height = '16px', borderRadius = '8px', className = '', style = {} }) => {
  return (
    <div
      className={`shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

/** Dashboard skeleton */
export const DashboardSkeleton = () => {
  const isMobile = window.innerWidth <= 768;
  return (
    <div className="container">
      <Skeleton width="140px" height="28px" borderRadius="8px" className="mt-4 mb-3" />
      <div className="flex flex-col md:flex-row md:flex-wrap justify-between">
        <div className="shadow-lg rounded-2xl p-6 h-56 my-0.5 mx-0.5" style={{ width: isMobile ? '100%' : '384px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)' }}>
          <Skeleton width="140px" height="20px" borderRadius="6px" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="flex justify-between mt-6 mb-4">
            <Skeleton width="100px" height="28px" borderRadius="6px" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <Skeleton width="80px" height="28px" borderRadius="6px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <Skeleton width="100%" height="12px" borderRadius="999px" style={{ background: 'rgba(255,255,255,0.15)' }} />
          <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <Skeleton width="120px" height="14px" borderRadius="6px" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <Skeleton width="90px" height="22px" borderRadius="6px" className="mt-2" style={{ background: 'rgba(255,255,255,0.2)' }} />
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-4 flex-grow h-56 my-2 md:my-0.5 border border-gray-100/80 flex items-center justify-center">
          <div className="flex items-center gap-8">
            <Skeleton width="140px" height="140px" borderRadius="50%" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton width="10px" height="10px" borderRadius="50%" />
                  <Skeleton width="80px" height="12px" borderRadius="4px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Skeleton width="170px" height="24px" borderRadius="8px" className="mt-6 mb-3" />
      <div className="flex justify-between overflow-x-auto">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white shadow-sm rounded-2xl p-4 w-full h-28 my-2 mx-0.5 border border-gray-100/80" style={{ flex: '1 1 0%' }}>
            <div className="flex items-center mb-4">
              <Skeleton width="40px" height="40px" borderRadius="12px" />
              <Skeleton width="100px" height="16px" borderRadius="6px" className="ml-4" />
            </div>
            <div className="flex justify-between">
              <Skeleton width="70px" height="18px" borderRadius="6px" />
              <Skeleton width="90px" height="22px" borderRadius="999px" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton width="190px" height="24px" borderRadius="8px" className="mt-6 mb-3" />
      <div className={`flex justify-between overflow-x-auto ${isMobile ? 'flex-col' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white shadow-sm rounded-2xl p-5 w-full my-2 mx-0.5 border border-gray-100/80" style={{ flex: '1 1 0%' }}>
            <div className="flex items-center mb-4">
              <Skeleton width="40px" height="40px" borderRadius="12px" />
              <Skeleton width="90px" height="16px" borderRadius="6px" className="ml-4" />
            </div>
            <div className="flex justify-between mb-3">
              <Skeleton width="60px" height="18px" borderRadius="6px" />
              <Skeleton width="70px" height="14px" borderRadius="6px" />
            </div>
            <Skeleton width="100%" height="10px" borderRadius="999px" />
          </div>
        ))}
      </div>
    </div>
  );
};

/** My Expenses skeleton */
export const ExpensesSkeleton = () => {
  return (
    <div>
      {/* Month chips */}
      <div className="flex gap-2 p-2.5">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width="120px" height="36px" borderRadius="12px" />
        ))}
      </div>
      {/* Filter tabs */}
      <div className="flex gap-2.5 p-3 bg-white rounded-2xl border border-gray-100/80 mt-2" style={{ maxWidth: '90%' }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} width="100px" height="38px" borderRadius="12px" />
        ))}
      </div>
      {/* Table */}
      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="bg-gray-50/80 px-6 py-3.5 flex gap-16">
          {['Name', 'Description', 'Amount', 'Category', 'Date'].map((_, i) => (
            <Skeleton key={i} width="80px" height="14px" borderRadius="4px" />
          ))}
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="px-6 py-4 flex gap-16 border-t border-gray-50">
            <Skeleton width="100px" height="16px" borderRadius="4px" />
            <Skeleton width="140px" height="16px" borderRadius="4px" />
            <Skeleton width="60px" height="16px" borderRadius="4px" />
            <Skeleton width="90px" height="16px" borderRadius="4px" />
            <Skeleton width="80px" height="16px" borderRadius="4px" />
          </div>
        ))}
      </div>
    </div>
  );
};

/** Add Expense skeleton */
export const AddExpenseSkeleton = () => {
  return (
    <div>
      <Skeleton width="150px" height="28px" borderRadius="8px" className="mb-4" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="mb-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80">
          <Skeleton width="70px" height="14px" borderRadius="4px" className="mb-2" />
          <Skeleton width="100%" height={i === 2 ? "144px" : "42px"} borderRadius="12px" />
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <Skeleton width="140px" height="42px" borderRadius="12px" />
      </div>
    </div>
  );
};

/** Set Budget skeleton */
export const BudgetSkeleton = () => {
  const isMobile = window.innerWidth <= 768;
  return (
    <div>
      <Skeleton width="130px" height="28px" borderRadius="8px" className="mb-2" />
      <Skeleton width="220px" height="16px" borderRadius="4px" className="mb-5" />
      <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-5"}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-100/80 shadow-sm rounded-2xl p-5">
            <div className="flex justify-between mb-2">
              <Skeleton width="110px" height="18px" borderRadius="6px" />
              <Skeleton width="70px" height="18px" borderRadius="6px" />
            </div>
            <Skeleton width="100%" height="8px" borderRadius="999px" className="mt-3 mb-2" />
            <div className="flex justify-between mb-3">
              <Skeleton width="30px" height="12px" borderRadius="4px" />
              <Skeleton width="60px" height="12px" borderRadius="4px" />
            </div>
            <Skeleton width="50px" height="10px" borderRadius="4px" className="mb-1" />
            <Skeleton width="100%" height="40px" borderRadius="12px" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 mt-5 shadow-sm border border-gray-100/80 flex items-center justify-between">
        <Skeleton width="250px" height="24px" borderRadius="6px" />
        <Skeleton width="120px" height="42px" borderRadius="12px" />
      </div>
    </div>
  );
};

export default Skeleton;
