

export default function NotFound() {
  return (
    <div className="w-full bg-main-10 h-[100vh] flex items-center justify-center">
    <div className="flex flex-col gap-[10px]">
            {/* <img src={error404} alt="error404__svg" className='error404__svg'/> */}
            <span className='flex flex-col gap-[10px] items-center max-w-[80vw] md:max-w-[50vw] lg:max-w-[400px]'>
                <p className='my-0 text-center text-main-902 font-[600] text-[1.25em]'>Oops :(</p>
                <p className='my-0 text-center text-main-901 font-[400] text-[1em] leading-[1.4em] mb-[20px]'>
                    The page you are currently looking for 
                    isn’t available or missing :(, maybe it was  removed or renamed,
                    we advise you go back to the homepage.
                </p>
            </span>
            {/* <Platformbtn name="Back to homepage" type="normal" click={()=> navigate('/dashboard')} /> */}
        </div>

</div>
  );
}