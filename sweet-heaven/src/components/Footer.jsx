import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
   
    <footer>
        <div className='bg-accent pt-12 pb-6 '>
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                    {/* лого */}
                    <div>
                        <h1 className='text-primary font-display text-3xl mb-4'>Sweet Heaven</h1>
                        <p className='text-muted-foreground font-body'>
                            Мы поможем вам найти сладости вашей мечты,которые вы могли и не представить
                        </p>
                    </div>
                    {/* Навигация */}
                    <div>
                        <h1 className='font-display mb-4 text-2xl'>Меню</h1>
                        <ul className='space-y-2'>
                            <li><Link to="/catalog?category=cakes" className="text-muted-foreground hover:text-primary transition-colors font-body">Торты</Link></li>
                            <li><Link to="/catalog?category=eclairs" className="text-muted-foreground hover:text-primary transition-colors font-body">Эклеры</Link></li>
                            <li><Link to="/catalog?category=macarons" className="text-muted-foreground hover:text-primary transition-colors font-body">Макаруны</Link></li>
                        </ul>
                    </div>
                    {/* контакты */}
                    <div>
                        <h1 className='font-display text-2xl mb-4'>Контакты</h1>  
                        <ul className='space-y-2 font-body'>
                            <li><span>+7 (914) 665-35-38</span> </li>  
                            <li><span>belkov-ki@mail.ru</span></li>   
                            <li><span>г.Владивосток, ул.Баляева 36</span></li>  
                        </ul> 
                    </div>
                </div>
                <div className='border-t border-border mt-10 pt-6 text-center text-muted-foreground font-body'>
                    <p> 2025 © Sweet Heaven. Все права защищены</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;