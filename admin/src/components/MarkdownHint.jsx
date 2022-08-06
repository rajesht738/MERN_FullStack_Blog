import React, { useRef, useEffect } from 'react'


export default function MarkdownHint() {
    const containerRef = useRef();
    const mdRules = [
        { title: "From h1 to h6", rule: "# Heading -> ###### Heading" },
        { title: "Blockquote", rule: "> Your Quote" },
        { title: "Image", rule: "![image alt](http://image_url.com)" },
        { title: "Link", rule: "[Link Text](http://your_link.com)" },
    ];

    useEffect(() => {
         containerRef.current?.classList.remove("-translate-y-5", "opacity-0");
         containerRef.current?.classList.add("translate-y-1", "opacity-1");
    }, [])

    return (
        <div ref={containerRef} className='bg-white px-2 py-4 rounded -translate-y-5 opacity-0 transition'>
            <h1 className='font-semibold text-center'>General markdown rules</h1>
            <ul>
                {mdRules.map(({ title, rule }) => {
                    return <li key={title}>
                        <p className='font-semibold text-gray-500'>{title}</p>
                        <p className='font-semibold text-gray-500 pl-2 font-mono'>{rule}</p>
                    </li>
                })}
                <li className='text-center text-blue-500'>
                    <a href="#https://www.markdownguide.org/basic-syntax/" target="_blank">Find more</a>
                </li>
            </ul>
        </div>
    )
}
