import React from 'react'

const Badge = ({name=''}) => {
  const badgeArray = ['primary','secondary','success','danger','warning','info','dark']
  const random = Math.floor(Math.random() * badgeArray.length);

  return (
    <>
      <h5><span data-testid="badge-test-id" className={`ms-3 badge bg-${badgeArray[random]} text-white`}>{name}</span></h5>
    </>
  )
}

export default Badge