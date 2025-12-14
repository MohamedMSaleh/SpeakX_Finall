import React, { useState, useRef, useEffect } from 'react';
import * as Icons from '../components/Icons';
import { GradientBackground, FloatingShapes, AnimatedCard, AnimatedBadge, XPCounter, StreakIndicator } from '../components/AnimatedComponents';

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
    <div className="h-full flex flex-col pb-24 relative overflow-hidden">
      <GradientBackground variant="multicolor" />
      <FloatingShapes />
      
      {/* Custom Header */}
      <div className="bg-white/95 backdrop-blur-md p-4 flex items-center justify-between shadow-xl sticky top-0 z-10 shrink-0 border-b-2 border-white/50">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-blue-50 rounded-full transition-all hover-lift">
              <Icons.ChevronRight className="rotate-180 text-gray-700" size={24} strokeWidth={3} />
            </button>
            <h2 className="font-black text-gray-900 text-xl">👤 My Profile</h2>
          </div>
          <button className="text-blue-600 text-sm font-black flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-full transition-all hover-lift shadow-md border-2 border-blue-200">
              <Icons.Share2 size={18} strokeWidth={3} /> Share
          </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-white/95 to-transparent backdrop-blur-md pb-8 pt-6 px-6 border-b border-white/30 flex flex-col items-center relative">
              <div className="w-32 h-32 rounded-full p-1.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 mb-4 relative group shadow-2xl animate-bounce-in">
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-inner">
                     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Edit Button */}
                  <button 
                    onClick={() => setShowEditMenu(true)}
                    className="absolute bottom-0 right-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-full shadow-2xl border-4 border-white hover:scale-110 transition-transform hover-lift"
                  >
                    <Icons.Edit2 size={18} strokeWidth={3} />
                  </button>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
              </div>
              
              <h1 className="text-3xl font-black text-gray-900 mb-2 drop-shadow">Amira Mahmoud</h1>
              <div className="flex items-center gap-3 text-gray-600 text-sm font-semibold mb-5">
                  <div className="flex items-center gap-1.5">
                    <Icons.MapPin size={16} className="text-blue-500" /> Cairo, Egypt
                  </div>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span>🗓️ Joined Oct 2023</span>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-4">
                  <XPCounter xp={1250} size="large" />
                  <StreakIndicator days={12} size="large" />
              </div>

              {/* Follow Stats */}
              <div className="flex items-center gap-10 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl border-2 border-white/50">
                  <div className="text-center">
                      <div className="font-black text-gray-900 text-2xl">142</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Following</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                      <div className="font-black text-gray-900 text-2xl">3.5k</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Followers</div>
                  </div>
                  <div className="w-px h-10 bg-gray-200"></div>
                  <div className="text-center">
                      <div className="font-black text-blue-600 text-2xl">Top 5%</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Ranking</div>
                  </div>
              </div>
          </div>

          <div className="p-6 space-y-6">
              {/* Main Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                  <AnimatedCard variant="white" className="p-5 flex flex-col gap-3 relative overflow-hidden border-2 border-orange-200">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Icons.Flame size={64} className="text-orange-500" />
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <Icons.Flame size={28} fill="currentColor" strokeWidth={0} />
                      </div>
                      <div>
                          <div className="text-3xl font-black text-gray-900">12</div>
                          <div className="text-xs text-gray-500 font-black uppercase tracking-wide">🔥 Day Streak</div>
                      </div>
                  </AnimatedCard>
                  
                  <AnimatedCard variant="white" className="p-5 flex flex-col gap-3 relative overflow-hidden border-2 border-yellow-200">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Icons.Zap size={64} className="text-yellow-500" />
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                          <Icons.Zap size={28} fill="currentColor" strokeWidth={0} />
                      </div>
                      <div>
                          <div className="text-3xl font-black text-gray-900">1.2k</div>
                          <div className="text-xs text-gray-500 font-black uppercase tracking-wide">⚡ Total XP</div>
                      </div>
                  </AnimatedCard>
              </div>

              {/* Statistics Grid */}
              <div>
                  <h3 className="font-black text-gray-900 mb-4 text-xl flex items-center gap-2">
                    📊 Statistics
                  </h3>
                  <AnimatedCard variant="white" className="p-6 border-2 border-blue-100">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-5">
                           <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg">
                                   <Icons.Target size={22} strokeWidth={2.5} />
                               </div>
                               <div>
                                   <div className="font-black text-gray-900 text-xl">B2</div>
                                   <div className="text-xs text-gray-500 font-bold">Current Level</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
                                   <Icons.Clock size={22} strokeWidth={2.5} />
                               </div>
                               <div>
                                   <div className="font-black text-gray-900 text-xl">42h</div>
                                   <div className="text-xs text-gray-500 font-bold">Practice Time</div>
                               </div>
                           </div>
                           <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                                   <Icons.BookOpen size={22} strokeWidth={2.5} />
                               </div>
                               <div>
                                   <div className="font-black text-gray-900 text-xl">350</div>
                                   <div className="text-xs text-gray-500 font-bold">Words Learned</div>
                               </div>
                           </div>
                            <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white shadow-lg">
                                   <Icons.Layers size={22} strokeWidth={2.5} />
                               </div>
                               <div>
                                   <div className="font-black text-gray-900 text-xl">12</div>
                                   <div className="text-xs text-gray-500 font-bold">Levels Done</div>
                               </div>
                           </div>
                      </div>
                  </AnimatedCard>
              </div>

              {/* Recent Achievements */}
              <div>
                   <div className="flex justify-between items-center mb-4">
                       <h3 className="font-black text-gray-900 text-xl flex items-center gap-2">
                         🎖️ Recent Badges
                       </h3>
                       <button className="text-blue-600 text-sm font-black hover:bg-blue-50 px-3 py-1.5 rounded-full transition-all hover-lift">View All →</button>
                   </div>
                   <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                       {[
                           { name: 'Early Bird', icon: '☀️', color: 'from-orange-400 to-amber-500' },
                           { name: 'Scholar', icon: '🎓', color: 'from-blue-400 to-indigo-500' },
                           { name: 'Friendly', icon: '🤝', color: 'from-green-400 to-emerald-500' },
                           { name: 'Sharpshooter', icon: '🎯', color: 'from-red-400 to-rose-500' }
                       ].map((badge, i) => (
                           <AnimatedCard key={i} variant="white" className="min-w-[110px] p-5 flex flex-col items-center gap-3 border-2 border-gray-100 hover-lift">
                               <div className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center text-3xl shadow-xl`}>
                                   {badge.icon}
                               </div>
                               <span className="text-xs font-black text-gray-700 text-center">{badge.name}</span>
                           </AnimatedCard>
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