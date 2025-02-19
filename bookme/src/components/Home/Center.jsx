import React from 'react'
import img from "../../images/head.svg"
import img1 from "../../images/down.svg"
import img2 from "../../images/manag.svg"
import slide from "../../images/slide.jpg"
import slide1 from "../../images/slide1.png"
import slide2 from "../../images/slide2.jpg"
import slide3 from "../../images/slide3.jpg"
import slide4 from "../../images/slide4.jpg"
import slide5 from "../../images/slide5.jpg"
import more from "../../images/more.svg"
import load from "../../images/load.svg"
import discov from "../../images/discov.svg"
import android from "../../images/android-app.A115Y25Z.svg"
import ios from "../../images/ios-app.BsEkpCCk.svg"
import app from "../../images/bookme-app.B0stX0tq.svg"
import coin from "../../images/coin.svg"
import Accordion from './AccordionItem'

export default function Center() {
    return (
        <div>
            <div className='w-[100%] h-[83px] mt-8 flex items-end justify-center gap-4'>
                <div className='h-[88%] w-[30%] flex rounded-[10px] border-[1px] border-[#E4E7EC]'>
                    <div className='h-full flex items-center'>
                        <img src={img} alt="" />
                    </div>
                    <div className='pl-4 pt-1'>
                        <h5 className='text-[18px] font-medium text-black'>Download Bookme App</h5>
                        <p className='text-[14.5px] font-medium text-[#344054] mt-1'>Find the best deals on our mobile app</p>
                    </div>
                </div>
                <div className='h-[88%] w-[30%] flex rounded-[10px] border-[1px] border-[#E4E7EC]'>
                    <div className='h-full flex items-center'>
                        <img src={img1} alt="" />
                    </div>
                    <div className='pl-4 pt-1'>
                        <h5 className='text-[18px] font-medium text-black'>Help Center</h5>
                        <p className='text-[14.5px] font-medium text-[#344054] mt-1'>Contact with our support team</p>
                    </div>
                </div>
                <div className='h-[88%] w-[30%] flex rounded-[10px] border-[1px] border-[#E4E7EC]'>
                    <div className='h-full flex items-center'>
                        <img src={img2} alt="" />
                    </div>
                    <div className='pl-4 pt-1'>
                        <h5 className='text-[18px] font-medium text-black'>Manage Bookings</h5>
                        <p className='text-[14.5px] font-medium text-[#344054] mt-1'>View and manage your bookings</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-auto mt-9 pl-10'>
                <h2 className='text-[28px] font-semibold text-[#101828]'>Latest Offers</h2>
                <p className='text-[18.8px] font-normal text-[#101828] mt-1'>We provide the best and most affordable services in Pakistan</p>
                <div className='w-[97.2%] h-[130px] mt-6 overflow-hidden'>
                    <div className='flex h-full w-[200%] slider animate-slide'>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide1} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide2} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide3} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide4} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                        <div className='h-full w-[16%] rounded-[10px]'>
                            <img src={slide5} alt="SVG" className='h-full w-full rounded-[10px]' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[275px] bg-[#313131] mt-10 pl-10 pt-[50px]'>
                <h2 className='text-[28px] font-bold text-white'>Why Use Bookme?</h2>
                <p className='text-[18.8px] font-normal text-white mt-[1px]'>We provide the best deals in Pakistan.</p>
                <div className='w-[97.2%] h-[98px] mt-4 flex'>
                    <div className='w-[33.34%] h-full flex'>
                        <div className='h-full w-[20%] flex items-center pl-2'>
                            <img src={load} alt="" />
                        </div>
                        <div className='pl-3 pt-4'>
                            <h2 className='text-[17px] font-semibold text-white'>More for Less</h2>
                            <p className='text-[14px] font-medium w-[80%] mt-2 text-white'>We offer e-tickets with exceptional discounted deals across the country</p>
                        </div>
                    </div>
                    <div className='w-[33.34%] h-full flex ml-1'>
                        <div className='h-full w-[15%] flex items-center pl-2'>
                            <img src={more} alt="" />
                        </div>
                        <div className='pl-3 pt-4'>
                            <h2 className='text-[17px] font-semibold text-white'>Lowest Fares</h2>
                            <p className='text-[14px] font-medium w-[90%] mt-2 text-white'>We provide affordable tickets to save up to 50%</p>
                        </div>
                    </div>
                    <div className='w-[33.34%] h-full flex ml-1'>
                        <div className='h-full w-[20%] flex items-center pl-2 '>
                            <img src={discov} alt="" />
                        </div>
                        <div className='pl-3 pt-4'>
                            <h2 className='text-[17px] font-semibold text-white'>Discover</h2>
                            <p className='text-[14px] font-medium w-[90%] mt-2 text-white'>We make travelling easy across Pakistan by providing easy e-ticket</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-auto pl-10 pt-9'>
                <p className='text-[28px] font-semibold tracking-[1px] text-black'>Frequently Asked Questions</p>
                <Accordion />
            </div>
            <div className='w-full h-auto p-[1px]'>
                <div className='w-[93.5%] h-[445px] mt-6 bg-[#1476D1] rounded-[10px] m-auto flex'>
                    <div className='h-full w-[58.2%] pl-10 pt-20 text-[#121619]'>
                        <h2 className='text-[28px] font-semibold tracking-[1px]'>Download our app</h2>
                        <p className='text-[18px] font-normal mt-3 tracking-[0.25px]'>Get amazing deals and bundles on Bookme Application</p>
                        <div className='mt-8 flex gap-2'>
                            <img src={ios} alt="SVG" className='cursor-pointer' />
                            <img src={android} alt="SVG" className='cursor-pointer' />
                        </div>
                        <div className='flex gap-2 mt-10'>
                            <input type="number" placeholder='Enter you phone number' className='w-[65.2%] h-[43px] rounded-[10px] text-black text-[15px] pl-4 placeholder:text-black outline-none' name="" id="" />
                            <button className='w-[25%] h-[43px] text-[14px] rounded-[10px] font-medium bg-[#FCEB03] text-[#121619]'>Get Download Link</button>
                        </div>
                        <p className='text-[14px] font-normal tracking-[0.5px] mt-2'>Your privacy is important for us. Check our <span className='underline'>privacy policy</span></p>
                    </div>
                    <div className='h-full w-[41.8%] flex items-end justify-center pl-11'>
                        <img src={app} alt="" />
                    </div>
                </div>
                <div className='w-[93.5%] h-[137px] bg-[#464646] m-auto mt-3 rounded-[10px] flex justify-between'>
                    <div className='flex'>
                        <div className='h-full flex items-center pl-5'>
                            <img src={coin} alt="SVG" />
                        </div>
                        <div className='h-full pl-5 pt-5'>
                            <h2 className='text-[28px] tracking-[0.5px] font-bold text-[#FCEB03]'>Earn Points to level up</h2>
                            <p className='text-[18px] font-normal mt-3 text-[#121619]'>Use your saved information to book tickets and redeem rewards.</p>
                        </div>
                    </div>
                    <div className='h-full pt-12 pr-4'>
                        <button className='h-[45px] w-[75px] text-black text-[15px] font-normal rounded-[10px] bg-[#F8F9FA] hover:bg-[#D3D4D5]'>Login</button>
                    </div>
                </div>
                <div className='w-[93.5%] h-auto m-auto mt-9 pb-8'>
                    <h2 className='text-[18px] font-semibold text-black'>Bookme - Online Tickets Booking in Pakistan</h2>
                    <p className='text-[14px] font-medium text-[#667085] tracking-[0.3px]'>Looking for hassle free <span className='text-[#FCEB03]'>bus ticket bookings</span> but ended up in long queues. Are you a travelling enthusiast but find difficulty in getting affordable <span className='text-[#FCEB03]'>flight tickets</span>? Are you finding trouble in <span className='text-[#FCEB03]'>movie tickets</span> and missing out on wonderful <span className='text-[#FCEB03]'>hotel bookings</span> across Pakistan? Plus being a cricket lover is it hard for you to get tickets easily? This is where Bookme steps in with online ticket booking in Pakistan and eliminates the need to stand in never-ending queues and chase travel agents that make travel a stressful thing. Bookme has the e-ticketing solution to all your ticketing problems. Now buy your tickets online at a discounted price and fix your spot. Moreover, we enable you to get cheap e-tickets with our in-app bundles.</p>
                    <h2 className='text-[18px] font-semibold text-black mt-4'>Travel through Pakistan</h2>
                    <p className='text-[14px] font-medium text-[#667085] tracking-[0.3px]'>Save big on your intercity travel by availing massive discounts on bus and domestic flight tickets. With Bookme, you can browse through hundreds of bus operators and airlines to find the most affordable option for yourself.</p>
                </div>
            </div>
        </div>
    )
}
