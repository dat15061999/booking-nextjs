import Link from 'next/link'

export default function NotFound() {
    return (
        <div className={'flex items-center justify-center mx-auto'}>
            <div>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/" className={''}>Return Home</Link>
            </div>
        </div>
    )
}