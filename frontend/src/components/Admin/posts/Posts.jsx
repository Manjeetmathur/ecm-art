import React, { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';

function Post({ post }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editImage, setEditImage] = useState(post.postImage);
  const [editTitle, setEditTitle] = useState(post.postTitle);
  const [editContent, setEditContent] = useState(post.postContent);
  const [editPrice, setEditPrice] = useState(post.postPrice);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSaveEdit = () => {
    // Handle saving the edited post data here
    console.log(editImage, editTitle, editContent, editPrice);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2">{isMenuOpen ? editTitle : post.postTitle}</h2>
        <button onClick={handleMenuClick} className="text-gray-500 hover:text-gray-700">
          <MdMoreVert />
        </button>
      </div>
      {isMenuOpen && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4  absolute  ">
          <input type="file" onChange={(e) => setEditImage(e.target.files[0])} className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="block w-full rounded-md border border-gray-300 p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex justify-end">
            <button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
            <button onClick={handleMenuClick} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </div>
      )}
      <img src={post.postImage} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p>{post.postTitle}</p>
      <p>{post.postContent}</p>
      <p>{post.postPrice}</p>
    </div>
  );
}

export default Post;