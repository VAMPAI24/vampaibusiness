import Script from "next/script";

const TawkToScript = () => {
    if (process.env.NODE_ENV !== "production") {
      return null;
    }

  return (
    <Script id="tawk-to-script" strategy="afterInteractive">
      {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/67a14f003a84273260796316/1ij71p6nf';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
      `}
    </Script>
  );
};

export default TawkToScript;
