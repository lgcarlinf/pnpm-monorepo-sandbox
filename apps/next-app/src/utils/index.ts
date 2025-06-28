export default function myImageLoader({ src }: { src: string }): string {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || ''; 
    
    return `${baseUrl}${src.startsWith('/') ? src : `/${src}`}`;
}