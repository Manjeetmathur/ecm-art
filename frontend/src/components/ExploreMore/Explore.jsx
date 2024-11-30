import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HomeLower from '../HomeMiddle/HomeLower'

const Explore = () => {
  const [cat, setCat] = useState('all')

  const { posts } = useSelector(st => st.auth)
  return (
    <div>
      <div className="flex p-4 mx-auto gap-3">
        <h1 onClick={() => setCat('sketch')}>Sketch</h1>
        <h1 onClick={() => setCat('painting')}>Painting</h1>
        <h1 onClick={() => setCat('drawing')}>Drawing</h1>
        <h1 onClick={() => setCat('3d')}>3d</h1>
        <h1 onClick={() => setCat('all')}>All</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {
          cat === 'all' && posts.map((item) => {
            return <HomeLower key={item._id} post={item} />
          })
        }
        {
          cat === 'sketch' && posts.map((item) => {
            return item.postCategory === 'sketch' && <HomeLower key={item._id} post={item} />
          })
        }
        {
          cat === 'drawing' && posts.map((item) => {
            return item.postCategory === 'drawing' && <HomeLower key={item._id} post={item} />
          })
        }
        {
          cat === '3d' && posts.map((item) => {
            return item.postCategory === 'digital-painting' && <HomeLower key={item._id} post={item} />
          })
        }
        {
          cat === 'painting' && posts.map((item) => {
            return item.postCategory === 'painting' && <HomeLower key={item._id} post={item} />
          })
        }
      </div>
    </div>
  )
}

export default Explore
