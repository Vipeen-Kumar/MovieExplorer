import React from 'react'

const Contact = () => {
  return (
    <div className='pt-16'>
      <div className='container mx-auto px-3 py-10'>
        <h1 className='text-3xl font-bold mb-5'>Contact Us</h1>
        <p className='text-lg text-neutral-400 mb-8'>
          Have questions, suggestions, or just want to say hello? We'd love to hear from you!
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='bg-neutral-800 p-6 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Get in Touch</h2>
            <div className='space-y-4 text-neutral-300'>
              <p>
                <span className='font-bold block'>Email:</span>
                vipeenk023@gmail.com
              </p>
              <p>
                <span className='font-bold block'>Address:</span>
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>
          
          <div className='bg-neutral-800 p-6 rounded-lg'>
            <h2 className='text-2xl font-semibold mb-4'>Follow Us</h2>
            <div className='flex gap-4'>
              <a href="https://www.linkedin.com/in/vipeen-kumar-835629367/" className='text-neutral-300 hover:text-white transition'>linkedin</a>
              <a href="https://github.com/Vipeen-Kumar" className='text-neutral-300 hover:text-white transition'>github</a>
              <a href="https://leetcode.com/u/VipeenKumar/" className='text-neutral-300 hover:text-white transition'>Leetcode</a>
            </div>
          </div>
        </div>

        <div className='mt-10 bg-neutral-800 p-8 rounded-lg max-w-2xl'>
            <h2 className='text-2xl font-semibold mb-6'>Send a Message</h2>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='text-neutral-400'>Name</label>
                    <input type='text' id='name' className='bg-neutral-700 p-2 rounded outline-none focus:ring-1 focus:ring-red-600' placeholder='Your Name'/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='text-neutral-400'>Email</label>
                    <input type='email' id='email' className='bg-neutral-700 p-2 rounded outline-none focus:ring-1 focus:ring-red-600' placeholder='Your Email'/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='message' className='text-neutral-400'>Message</label>
                    <textarea id='message' rows='4' className='bg-neutral-700 p-2 rounded outline-none focus:ring-1 focus:ring-red-600' placeholder='Your Message'></textarea>
                </div>
                <button type='button' className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition w-max mt-2'>
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
