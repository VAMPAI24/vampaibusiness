/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'vampai-resume.s3.us-east-1.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'vampai-resume.s3.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: 'meet.google.com',
        },
        {
          protocol: 'https',
          hostname: 'x.com',
        },
        {
          protocol: 'https',
          hostname: 'media.istockphoto.com', 
        },
      ],
    },
  };
  
  export default nextConfig;
  