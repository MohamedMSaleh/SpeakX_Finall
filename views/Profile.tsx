import React, { useState, useRef, useEffect } from 'react';
import * as Icons from '../components/Icons';

const Profile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [profileImage, setProfileImage] = useState('https://picsum.photos/200/200?random=8');
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null); // For cropping preview
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Crop State
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setTempImage(imageUrl);
      setCropPos({ x: 0, y: 0 });
      setZoom(1);
      setShowEditMenu(false);
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragStart({ x: clientX - cropPos.x, y: clientY - cropPos.y });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    setCropPos({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const saveCroppedImage = () => {
      if (tempImage && imageRef.current) {
          const canvas = document.createElement('canvas');
          const size = 300; // Output size
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');

          if (ctx) {
              const img = imageRef.current;
              
              // Calculate draw parameters based on current visual transform
              // The container is 300x300 (displayed). 
              // We draw the image at the same offset and scale relative to the canvas size.
              // Note: This simplified logic assumes the preview container pixels map 1:1 to canvas pixels for WYSIWYG
              
              // Clear canvas with white background
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, size, size);

              // Center point translation
              ctx.translate(size / 2, size / 2);
              ctx.translate(cropPos.x, cropPos.y);
              ctx.scale(zoom, zoom);
              
              // Draw image centered
              ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

              const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
              setProfileImage(croppedUrl);
              setTempImage(null);
          }
      }
  };

  const handleRemovePhoto = () => {
      setProfileImage('https://via.placeholder.com/200?text=User'); // Default placeholder
      setShowEditMenu(false);
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col pb-24 relative">
      {/* Custom Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><Icons.ChevronRight className="rotate-180 text-gray-600" size={24} /></button>
            <h2 className="font-bold text-gray-900 text-lg">My Profile</h2>
          </div>
          <button className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
              <Icons.Share2 size={16} /> Share
          </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Section */}
          <div className="bg-white pb-8 pt-6 px-6 border-b border-gray-100 flex flex-col items-center relative">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-purple-500 mb-4 relative group">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200">
                     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Edit Button */}
                  <button 
                    onClick={() => setShowEditMenu(true)}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md border-2 border-white hover:bg-blue-700 transition-colors"
                  >
                    <Icons.Edit2 size={14} />
                  </button>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Amira Mahmoud</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                  <Icons.MapPin size={14} /> Cairo, Egypt
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>Joined Oct 2023</span>
              </div>

              {/* Follow Stats */}
              <div className="flex items-center gap-8 mb-2">
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">142</div>
                      <div className="text-xs text-gray-400 font-medium">Following</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">3.5k</div>
                      <div className="text-xs text-gray-400 font-medium">Followers</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">Top 5%</div>
                      <div className="text-xs text-gray-400 font-medium">Ranking</div>
                  </div>
              </div>
          </div>

          <div className="p-5 space-y-6">
              {/* Main Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Icons.Flame size={48} className="text-orange-500" />
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                          <Icons.Flame size={20} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-2xl font-bold text-gray-900">12</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Day Streak</div>
                      </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Icons.Zap size={48} className="text-yellow-500" />
                      </div>
                      <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                          <Icons.Zap size={20} fill="currentColor" />
                      </div>
                      <div>
                          <div className="text-2xl font-bold text-gray-900">1.2k</div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Total XP</div>
                      </div>
                  </div>
              </div>

              {/* Statistics Grid */}
              <div>
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Statistics</h3>
                  <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                   <Icons.Target size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">B2</div>
                                   <div className="text-xs text-gray-500">Current Level</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                   <Icons.Clock size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">42h</div>
                                   <div className="text-xs text-gray-500">Practice Time</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                   <Icons.BookOpen size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">350</div>
                                   <div className="text-xs text-gray-500">Words Learned</div>
                               </div>
                           </div>
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600">
                                   <Icons.Layers size={18} />
                               </div>
                               <div>
                                   <div className="font-bold text-gray-900 text-lg">12</div>
                                   <div className="text-xs text-gray-500">Levels Done</div>
                               </div>
                           </div>
                      </div>
                  </div>
              </div>

              {/* Recent Achievements */}
              <div>
                   <div className="flex justify-between items-center mb-4">
                       <h3 className="font-bold text-gray-900 text-lg">Recent Badges</h3>
                       <button className="text-blue-600 text-sm font-bold">View All</button>
                   </div>
                   <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                       {[
                           { name: 'Early Bird', icon: '☀️', color: 'bg-orange-100' },
                           { name: 'Scholar', icon: '🎓', color: 'bg-blue-100' },
                           { name: 'Friendly', icon: '🤝', color: 'bg-green-100' },
                           { name: 'Sharpshooter', icon: '🎯', color: 'bg-red-100' }
                       ].map((badge, i) => (
                           <div key={i} className="min-w-[100px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                               <div className={`w-14 h-14 ${badge.color} rounded-full flex items-center justify-center text-2xl`}>
                                   {badge.icon}
                               </div>
                               <span className="text-xs font-bold text-gray-700 text-center">{badge.name}</span>
                           </div>
                       ))}
                   </div>
              </div>
          </div>
      </div>

      {/* Edit Photo Action Sheet/Menu */}
      {showEditMenu && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowEditMenu(false)}>
              <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-200" onClick={e => e.stopPropagation()}>
                  <h3 className="font-bold text-gray-900 text-lg mb-4 text-center">Change Profile Photo</h3>
                  <div className="space-y-3">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-blue-50 text-blue-600 font-bold py-3.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                      >
                          <Icons.UploadCloud size={20} /> Upload New Photo
                      </button>
                      <button 
                        onClick={handleRemovePhoto}
                        className="w-full bg-red-50 text-red-600 font-bold py-3.5 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                          <Icons.Trash2 size={20} /> Remove Current Photo
                      </button>
                      <div className="h-2"></div>
                      <button 
                        onClick={() => setShowEditMenu(false)}
                        className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                          Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Interactive Crop Modal */}
      {tempImage && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl m-4">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Adjust Photo</h3>
                      <button onClick={() => setTempImage(null)} className="text-gray-400 hover:text-gray-600">
                          <Icons.X size={24} />
                      </button>
                  </div>
                  
                  {/* Interactive Viewport */}
                  <div className="relative w-full aspect-square bg-gray-900 overflow-hidden cursor-move touch-none">
                      <div 
                        className="w-full h-full flex items-center justify-center pointer-events-auto"
                        onMouseDown={handlePointerDown}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onMouseLeave={handlePointerUp}
                        onTouchStart={handlePointerDown}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                      >
                          <img 
                            ref={imageRef}
                            src={tempImage} 
                            alt="Crop Preview" 
                            className="max-w-none select-none pointer-events-none"
                            style={{ 
                                transform: `translate3d(${cropPos.x}px, ${cropPos.y}px, 0) scale(${zoom})` 
                            }}
                            draggable={false}
                          />
                      </div>
                      
                      {/* Visual Circle Guide Overlay */}
                      <div className="absolute inset-0 pointer-events-none border-[30px] border-black/50 rounded-full"></div>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                          <span className="text-white/80 text-xs font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                              Drag to move • Pinch/Slider to zoom
                          </span>
                      </div>
                  </div>

                  {/* Zoom Control */}
                  <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                          <Icons.Image size={16} className="text-gray-400" />
                          <input 
                            type="range" 
                            min="0.5" 
                            max="3" 
                            step="0.1" 
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <Icons.Image size={24} className="text-gray-600" />
                      </div>
                  </div>

                  <div className="p-4 flex gap-3">
                      <button 
                        onClick={() => setTempImage(null)}
                        className="flex-1 py-3 font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                          Cancel
                      </button>
                      <button 
                        onClick={saveCroppedImage}
                        className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                          Save Photo
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Profile;