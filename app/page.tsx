"use client";

import { useMemo, useState, type ReactNode } from "react";

type Product = { id:number; name:string; en:string; category:string; price:number; oldPrice?:number; weight:string; badge?:string; image:string; description:string };
const products:Product[] = [
 {id:1,name:"সুন্দরবনের খাঁটি মধু",en:"Sundarbans Raw Honey",category:"মধু",price:650,oldPrice:750,weight:"৫০০ গ্রাম",badge:"জনপ্রিয়",image:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=85",description:"প্রাকৃতিক স্বাদ ও ঘ্রাণে ভরপুর মধু।"},
 {id:2,name:"প্রিমিয়াম কাজুবাদাম",en:"Premium Cashews",category:"বাদাম",price:480,weight:"২৫০ গ্রাম",image:"https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=85",description:"বাছাই করা মানসম্মত কাজুবাদাম।"},
 {id:3,name:"আজওয়া খেজুর",en:"Ajwa Dates",category:"খেজুর",price:890,oldPrice:990,weight:"৫০০ গ্রাম",badge:"সেরা পছন্দ",image:"https://images.unsplash.com/photo-1590080877777-6c5c7c5a6f2d?auto=format&fit=crop&w=900&q=85",description:"নরম, মিষ্টি ও বাছাই করা খেজুর।"},
 {id:4,name:"খাঁটি হলুদ গুঁড়া",en:"Pure Turmeric Powder",category:"মসলা",price:180,weight:"২০০ গ্রাম",image:"https://images.unsplash.com/photo-1615485500704-8e990f9900f4?auto=format&fit=crop&w=900&q=85",description:"রান্নায় প্রাকৃতিক রং ও সুবাস যোগ করে।"},
 {id:5,name:"আমসত্ত্ব",en:"Mango Fruit Leather",category:"প্রাকৃতিক খাবার",price:250,weight:"২৫০ গ্রাম",image:"https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=85",description:"আমের স্বাদে তৈরি ঐতিহ্যবাহী খাবার।"},
 {id:6,name:"মিক্সড নাটস",en:"Mixed Premium Nuts",category:"বাদাম",price:550,weight:"২৫০ গ্রাম",badge:"নতুন",image:"https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=900&q=85",description:"দৈনন্দিন স্ন্যাকসের জন্য বাদামের মিশ্রণ।"},
 {id:7,name:"কালোজিরা ফুলের মধু",en:"Black Seed Flower Honey",category:"মধু",price:780,weight:"৫০০ গ্রাম",image:"https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=85",description:"ঘন স্বাদ ও সুন্দর সুবাসের মধু।"},
 {id:8,name:"বিশুদ্ধ গিফট বক্স",en:"Bishuddho Gift Box",category:"গিফট বক্স",price:1450,weight:"১টি বক্স",badge:"উপহার",image:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",description:"প্রিয়জনের জন্য যত্নে সাজানো উপহার।"}
];
const categories=["সব পণ্য","মধু","বাদাম","খেজুর","মসলা","প্রাকৃতিক খাবার","গিফট বক্স"];
type CartItem={product:Product;qty:number};

/* Professional line icons (inline SVG) */
const Svg=({children,size=20,fill="none",sw=1.8}:{children:ReactNode;size?:number;fill?:string;sw?:number})=><svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
const Ic={
 leaf:(s=20)=><Svg size={s}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6 2.4-.5 4.9-2 5.9-3"/></Svg>,
 cart:(s=20)=><Svg size={s}><path d="M2 3h2.5l2.2 11.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L21 7H5.2"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></Svg>,
 search:(s=18)=><Svg size={s}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Svg>,
 user:(s=18)=><Svg size={s}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Svg>,
 menu:(s=20)=><Svg size={s}><path d="M4 7h16M4 12h16M4 17h16"/></Svg>,
 close:(s=18)=><Svg size={s}><path d="M6 6l12 12M18 6 6 18"/></Svg>,
 plus:(s=16)=><Svg size={s} sw={2.2}><path d="M12 5v14M5 12h14"/></Svg>,
 minus:(s=16)=><Svg size={s} sw={2.2}><path d="M5 12h14"/></Svg>,
 arrow:(s=18)=><Svg size={s} sw={2}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>,
 check:(s=16)=><Svg size={s} sw={2.4}><path d="m5 12.5 4.5 4.5L19 7.5"/></Svg>,
 shield:(s=20)=><Svg size={s}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></Svg>,
 truck:(s=20)=><Svg size={s}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></Svg>,
 box:(s=20)=><Svg size={s}><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/></Svg>,
 gift:(s=20)=><Svg size={s}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2.5 0-4-1-4-2.5S9.5 3 12 5c2.5-2 4-.5 4 .5S14.5 8 12 8z"/></Svg>,
 star:(s=20)=><Svg size={s} fill="currentColor" sw={1.2}><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></Svg>,
 bag:(s=30)=><Svg size={s} sw={1.5}><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></Svg>,
};

const Logo=()=><a className="brand" href="#home"><span className="brand-mark">{Ic.leaf(34)}</span><span className="brand-copy"><strong>Bishuddho<span> বিশুদ্ধ</span></strong><small>PURE BY NATURE</small></span></a>;

export default function Home(){
 const [category,setCategory]=useState("সব পণ্য"),[search,setSearch]=useState(""),[sort,setSort]=useState("featured"),[cart,setCart]=useState<CartItem[]>([]),[cartOpen,setCartOpen]=useState(false),[checkoutOpen,setCheckoutOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[notice,setNotice]=useState("");
 const visible=useMemo(()=>{let a=products.filter(p=>(category==="সব পণ্য"||p.category===category)&&(`${p.name} ${p.en} ${p.category}`.toLowerCase().includes(search.toLowerCase().trim())));if(sort==="low")a=[...a].sort((x,y)=>x.price-y.price);if(sort==="high")a=[...a].sort((x,y)=>y.price-x.price);return a},[category,search,sort]);
 const count=cart.reduce((s,i)=>s+i.qty,0),subtotal=cart.reduce((s,i)=>s+i.product.price*i.qty,0),delivery=subtotal===0||subtotal>=2000?0:80,total=subtotal+delivery;
 const add=(product:Product)=>{setCart(c=>{const old=c.find(i=>i.product.id===product.id);return old?c.map(i=>i.product.id===product.id?{...i,qty:i.qty+1}:i):[...c,{product,qty:1}]});setNotice(`${product.name} কার্টে যোগ হয়েছে`);setTimeout(()=>setNotice(""),2200)};
 const qty=(id:number,d:number)=>setCart(c=>c.map(i=>i.product.id===id?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0));
 const goProducts=()=>{document.getElementById("products")?.scrollIntoView({behavior:"smooth"});setMenuOpen(false)};
 const close=()=>setMenuOpen(false);
 return <main>
  <div className="announcement">✦ ৳২,০০০ টাকার বেশি অর্ডারে ডেলিভারি চার্জ ফ্রি ✦</div>
  <header className="site-header"><Logo/>
   <nav className={menuOpen?"nav-links nav-open":"nav-links"}><a className="active" href="#home" onClick={close}>Home</a><a href="#products" onClick={close}>Shop</a><a href="#story" onClick={close}>Our Story</a><a href="#promise" onClick={close}>Our Promise</a><a href="#contact" onClick={close}>Contact</a></nav>
   <div className="header-actions"><label className="header-search">{Ic.search()}<input value={search} onChange={e=>{setSearch(e.target.value);goProducts()}} placeholder="Search products..." aria-label="Search products"/></label><button className="cart-button" onClick={()=>setCartOpen(true)} aria-label="Open cart">{Ic.cart(18)}<span className="cart-label">Cart</span><b>{count}</b></button><button className="icon-btn menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">{menuOpen?Ic.close(20):Ic.menu()}</button></div>
  </header>

  <section className="hero" id="home">
   <span className="leaf-deco a">{Ic.leaf(220)}</span><span className="leaf-deco b">{Ic.leaf(150)}</span>
   <div className="hero-copy"><span className="pill">{Ic.leaf(15)}Good for You. Good for Nature.</span><h1>প্রকৃতির খাঁটি স্বাদ,<br/><em>আপনার প্রতিদিনে।</em></h1><p>বিশুদ্ধতার সাথে বেছে নিন প্রাকৃতিক খাবার। যত্নে সংগ্রহ করা মানসম্মত পণ্য পৌঁছে যাবে আপনার ঘরে।</p><div className="hero-actions"><button className="button primary" onClick={goProducts}>Shop Now {Ic.arrow()}</button><a className="button yellow" href="#story">Explore Our Story {Ic.arrow()}</a></div></div>
   <div className="hero-visual"><div className="blob"/>
    <div className="shot s1"><img src="https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1000&q=90" alt="প্রাকৃতিক মধুর জার"/></div>
    <div className="shot s2"><img src="https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=700&q=85" alt="কাজুবাদাম"/></div>
    <div className="shot s3"><img src="https://images.unsplash.com/photo-1608797178974-15b35a64ede9?auto=format&fit=crop&w=600&q=85" alt="মিক্সড নাটস"/></div>
    <div className="float f1"><span className="ic">{Ic.shield()}</span><div><strong>Pure &amp; Natural</strong><small>Carefully selected</small></div></div>
    <div className="float f2"><span className="ic y">{Ic.truck()}</span><div><strong>Nationwide Delivery</strong><small>Right to your door</small></div></div>
    <div className="float f3"><span className="ic y">{Ic.star(20)}</span><div><strong>Premium Quality</strong><small>Hand-picked with care</small></div></div>
   </div>
  </section>

  <section className="benefits" id="promise">{[[Ic.leaf(22),"Carefully Selected","প্রতিটি পণ্যে মানের গুরুত্ব"],[Ic.shield(22),"Pure & Natural","দৈনন্দিন জীবনের জন্য"],[Ic.truck(22),"Easy Delivery","আপনার দরজায় পৌঁছে দিই"],[Ic.gift(22),"Gift-ready Packaging","উপহার হোক আরও বিশেষ"]].map(x=><div className="benefit" key={x[1] as string}><span>{x[0]}</span><div><strong>{x[1]}</strong><small>{x[2]}</small></div></div>)}</section>

  <section className="products-section" id="products"><div className="section-heading"><div><span className="pill">{Ic.leaf(14)}Our Collection</span><h2>ভালো থাকার <em>প্রাকৃতিক সঙ্গী</em></h2><p>প্রতিদিনের পছন্দে থাকুক প্রকৃতির ছোঁয়া।</p></div><a className="text-link desktop-link" href="#products">View All Products {Ic.arrow(16)}</a></div>
   <div className="toolbar"><div className="category-tabs">{categories.map(c=><button key={c} className={category===c?"category-tab active":"category-tab"} onClick={()=>setCategory(c)}>{c}</button>)}</div><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="পণ্য সাজান"><option value="featured">বাছাইকৃত</option><option value="low">দাম: কম থেকে বেশি</option><option value="high">দাম: বেশি থেকে কম</option></select></div>
   {visible.length?<div className="product-grid">{visible.map((p,i)=><article className="product-card" key={p.id}><div className="product-photo"><img src={p.image} alt={p.name} loading={i>3?"lazy":"eager"}/>{p.badge&&<span className="badge">{p.badge}</span>}<button className="quick-add" onClick={()=>add(p)} aria-label="কার্টে যোগ করুন">{Ic.plus(18)}</button></div><div className="product-info"><span className="product-category">{p.category}</span><h3>{p.name}</h3><p className="product-en">{p.en}</p><p className="description">{p.description}</p><div className="product-bottom"><div><strong>৳{p.price.toLocaleString("en-US")}</strong>{p.oldPrice&&<del>৳{p.oldPrice.toLocaleString("en-US")}</del>}<small>{p.weight}</small></div><button onClick={()=>add(p)}>{Ic.cart(15)}Add to Cart</button></div></div></article>)}</div>:<div className="empty"><h3>কোনো পণ্য পাওয়া যায়নি</h3><button className="button primary" onClick={()=>{setSearch("");setCategory("সব পণ্য")}}>সব পণ্য দেখুন</button></div>}
  </section>

  <section className="story-section" id="story"><div className="story-photo"><img src="https://images.unsplash.com/photo-1543168256-418811576931?auto=format&fit=crop&w=1200&q=85" alt="প্রাকৃতিক খাবার ও উপাদান" loading="lazy"/><div className="photo-note">{Ic.leaf(22)}<span>প্রকৃতির সরলতাই<br/><strong>আমাদের অনুপ্রেরণা</strong></span></div></div><div className="story-copy"><span className="pill">{Ic.leaf(14)}Our Belief</span><h2>বিশুদ্ধতা শুধু একটি নাম নয়,<br/><em>এটি আমাদের অঙ্গীকার।</em></h2><p>আমরা বিশ্বাস করি, ভালো খাবার শুরু হয় ভালো পছন্দ থেকে। তাই প্রতিটি পণ্যের ক্ষেত্রে গুরুত্ব দিই বাছাই, যত্ন এবং আপনার আস্থাকে।</p><p>পরিবারের প্রতিদিনের খাবার থেকে প্রিয়জনের উপহার—বিশুদ্ধ থাকুক আপনার পাশে।</p><a className="button outline" href="#products">Our Products {Ic.arrow(16)}</a></div></section>

  <section className="newsletter"><div className="newsletter-mark">{Ic.leaf(26)}</div><div><span className="pill">Stay with Bishuddho</span><h2>নতুন স্বাদ ও অফারের খবর<br/><em>পৌঁছে যাক আপনার ইনবক্সে।</em></h2></div><form action="https://formsubmit.co/delowerdipu420@gmail.com" method="POST"><input type="hidden" name="_subject" value="Bishuddho newsletter signup"/><input type="hidden" name="_captcha" value="false"/><input type="email" name="email" required placeholder="আপনার ইমেইল ঠিকানা" aria-label="আপনার ইমেইল ঠিকানা"/><button>Subscribe {Ic.arrow(15)}</button><small>স্প্যাম নয়—শুধু বিশুদ্ধ আপডেট।</small></form></section>

  <footer className="footer" id="contact"><div className="footer-main"><div><Logo/><p>প্রকৃতির খাঁটি স্বাদ, আপনার প্রতিদিনে।</p></div><div><strong>Quick Links</strong><a href="#home">Home</a><a href="#products">Shop</a><a href="#story">Our Story</a></div><div><strong>Customer Care</strong><a href="mailto:delower@bishuddho.bond">Email Us</a><a href="#promise">Delivery Info</a></div><div><strong>Contact</strong><p>বাংলাদেশ জুড়ে ডেলিভারি</p><a href="mailto:delower@bishuddho.bond">delower@bishuddho.bond</a></div></div><div className="footer-bottom">© {new Date().getFullYear()} BISHUDDHO. সর্বস্বত্ব সংরক্ষিত।<span>যত্নে বাছাই · ভালোবাসায় পৌঁছে দিই</span></div></footer>

  {notice&&<div className="toast" role="status">{Ic.check(16)}{notice}</div>}

  {cartOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCartOpen(false)}}><aside className="drawer"><div className="drawer-head"><div><span className="pill">আপনার পছন্দ</span><h2>শপিং কার্ট ({count})</h2></div><button className="close" onClick={()=>setCartOpen(false)} aria-label="Close">{Ic.close()}</button></div>{cart.length?<><div className="cart-items">{cart.map(({product,qty:n})=><div className="cart-item" key={product.id}><img src={product.image} alt={product.name}/><div><strong>{product.name}</strong><small>{product.weight}</small><b>৳{(product.price*n).toLocaleString("en-US")}</b><div className="qty"><button onClick={()=>qty(product.id,-1)} aria-label="Decrease">{Ic.minus(14)}</button><span>{n}</span><button onClick={()=>qty(product.id,1)} aria-label="Increase">{Ic.plus(14)}</button></div></div></div>)}</div><div className="cart-summary"><p><span>সাবটোটাল</span><b>৳{subtotal.toLocaleString("en-US")}</b></p><p><span>ডেলিভারি</span><b>{delivery?`৳${delivery}`:"ফ্রি"}</b></p><p className="total"><span>সর্বমোট</span><b>৳{total.toLocaleString("en-US")}</b></p><small>{subtotal<2000?`আর ৳${(2000-subtotal).toLocaleString("en-US")} কিনলে ডেলিভারি ফ্রি`:"আপনার ডেলিভারি চার্জ ফ্রি!"}</small><button className="button primary full" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>অর্ডার সম্পন্ন করুন {Ic.arrow(16)}</button></div></>:<div className="cart-empty"><span className="empty-ic">{Ic.bag()}</span><h3>আপনার কার্ট এখনো খালি</h3><p>পছন্দের প্রাকৃতিক পণ্য যোগ করুন।</p><button className="button primary" onClick={()=>{setCartOpen(false);goProducts()}}>পণ্য দেখুন</button></div>}</aside></div>}

  {checkoutOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setCheckoutOpen(false)}}><section className="checkout"><div className="drawer-head"><div><span className="pill">আর মাত্র এক ধাপ</span><h2>অর্ডার তথ্য</h2></div><button className="close" onClick={()=>setCheckoutOpen(false)} aria-label="Close">{Ic.close()}</button></div><p className="checkout-intro">আপনার তথ্য দিন। অর্ডারের বিবরণ ইমেইলে পাঠানো হবে।</p><form action="https://formsubmit.co/delowerdipu420@gmail.com" method="POST" className="checkout-form"><input type="hidden" name="_subject" value="New Bishuddho order"/><input type="hidden" name="_captcha" value="false"/><input type="hidden" name="_next" value="https://bishuddho.bond/?order=received"/><input type="hidden" name="Order items" value={cart.map(({product,qty:n})=>`${product.name} x ${n} — ৳${product.price*n}`).join(" | ")}/><input type="hidden" name="Subtotal" value={`৳${subtotal}`}/><input type="hidden" name="Delivery charge" value={delivery===0?"Free":`৳${delivery}`}/><input type="hidden" name="Total" value={`৳${total}`}/><label>আপনার নাম<input name="name" autoComplete="name" required placeholder="সম্পূর্ণ নাম"/></label><label>মোবাইল নম্বর<input name="phone" type="tel" autoComplete="tel" required placeholder="01XXXXXXXXX"/></label><label>ডেলিভারি ঠিকানা<textarea name="address" autoComplete="street-address" required rows={3} placeholder="বাসা/রোড, এলাকা, জেলা"/></label><label>পেমেন্ট পদ্ধতি<select name="Payment method" defaultValue="Cash on Delivery"><option value="Cash on Delivery">ক্যাশ অন ডেলিভারি</option><option value="bKash">বিকাশ (ম্যানুয়াল কনফার্মেশন)</option><option value="Nagad">নগদ (ম্যানুয়াল কনফার্মেশন)</option></select></label><p className="total"><span>সর্বমোট</span><b>৳{total.toLocaleString("en-US")}</b></p><small className="form-note">বিকাশ/নগদ পেমেন্ট যাচাই ও পেমেন্ট নম্বরের ব্যবস্থা আলাদাভাবে যুক্ত করতে হবে।</small><button className="button primary full" type="submit">অর্ডার পাঠান {Ic.arrow(16)}</button></form></section></div>}
 </main>
}
