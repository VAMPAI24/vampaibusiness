/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'vampai-resume.s3.us-east-1.amazonaws.com', 
            'vampai-resume.s3.amazonaws.com',
            'meet.google.com', 
            'x.com'
          ],
      },

};

export default nextConfig;
