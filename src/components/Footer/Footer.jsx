import { Link } from 'react-router-dom'

import address from '@/assets/icon/icons8-address-100.png'
import phone from '@/assets/icon/icons8-phone-100.png'
import email from '@/assets/icon/icons8-email-100.png'
import line from '@/assets/icon/icons8-line-100.png'
import footerImg from '@/assets/img/footer/sportive-dog-performing-during-lure-coursing-competition.jpg'

const Footer = () => {
    return(
        <div>
            <div className="py-[2em] h-[400px]" style={{backgroundImage:`linear-gradient(rgba(12, 157, 221, 0.9), rgba(12, 157, 221, 0.9)), url(${footerImg})`, backgroundSize:"full",backgroundPosition:"center center", backgroundRepeat:"no-repeat"}}>
                <div className='flex justify-center text-white'>
                    <div className='w-[15em] p-[1em] mx-[1em]'>
                        <div className='mb-[1em] font-bold'>HOSPITAL</div>
                        <div className='w-[2em] h-[2px] bg-white mb-[10px]'></div>
                        <p>OPEN EVERYDAY FROM 09:00-24:00 For Appointment 02-xxxx-xxxx ext: x</p>
                    </div>
                    <div className='w-[15em] p-[1em] mx-[1em]'>
                        <div className='mb-[1em] font-bold'>BRUSH & BLOOM, PETSHOP</div>
                        <div className='w-[2em] h-[2px] bg-white mb-[10px]'></div>
                        <p>OPEN EVERYDAY FROM 10:30-19:30 FOR APPOINTMENT 02-539-3888 ext 222</p>
                    </div>
                    <div className='w-[15em] p-[1em] mx-[1em]'>
                        <div className='mb-[1em] font-bold'>MAIN MENU</div>
                        <div className='w-[2em] h-[2px] bg-white mb-[10px]'></div>
                        <ul>
                            <li><Link onClick={scrollTo(top)} to="/" >HOME</Link></li>
                            <li><Link onClick={scrollTo(top)} to="/aboutus" >ABOUT US </Link></li>
                            <li><Link onClick={scrollTo(top)} to="/service">SERVICE</Link></li>
                        </ul>
                    </div>
                    <div className='w-[15em] p-[1em] mx-[1em]'>
                        <div className='mb-[1em] font-bold'>CONTACT</div>
                        <div className='w-[2em] h-[2px] bg-white mb-[10px]'></div>
                        <ul>
                            <li className='flex items-center mb-[7px]'>
                                <img src={address} className='mr-[1em]' width="35px" alt="" />
                                <div>
                                    <div className='font-medium'>ADDRESS</div>
                                    <div>xxx Khlong Chan, Bang Kapi District, Bangkok xxxxx</div>
                                </div>
                            </li>
                            <li className='flex items-center mb-[7px]'>
                                <img src={phone} className='mr-[1em]' width="35px" alt="" />
                                <div>
                                    <div className='font-medium'>PHONE</div>
                                    <div>02-xxx-xxxx</div>
                                </div>
                            </li>
                            <li className='flex items-center mb-[7px]'>
                                <img src={email} className='mr-[1em]' width="35px" alt="" />
                                <div>
                                    <div className='font-medium'>EMAIL</div>
                                    <a href='info@email.com'>info@email.com</a>
                                </div>
                            </li>
                            <li className='flex items-center mb-[7px]'>
                                <img src={line} className='mr-[1em]' width="35px" alt="" />
                                <div>
                                    <div className='font-medium'>LINE</div>
                                    <div>@happypet</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer