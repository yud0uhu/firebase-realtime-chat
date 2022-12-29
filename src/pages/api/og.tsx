import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}
// NOTE: VercelのEdge Function超過のためフォントを未使用に
// const font = fetch(new URL('../../assets/KosugiMaru-Regular-Subset.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer(),
// )
export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    // ?title=<title>
    const hasTitle = searchParams.has('title')
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'あざらしちゃっと'
    // const fontData = await font

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${`data:image/svg+xml,${encodeURIComponent(
              '<svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="900" height="600" fill="#BAE6FC"></rect><g transform="translate(420.9767462136944 298.4175692475536)"><path d="M186.2 -169.9C236.2 -136.2 268.1 -68.1 251.7 -16.4C235.4 35.4 170.7 70.7 120.7 109.9C70.7 149 35.4 192 -10.3 202.3C-55.9 212.5 -111.7 190.1 -145.9 150.9C-180.1 111.7 -192.5 55.9 -196.7 -4.1C-200.8 -64.1 -196.6 -128.2 -162.4 -161.9C-128.2 -195.6 -64.1 -198.8 2 -200.8C68.1 -202.8 136.2 -203.6 186.2 -169.9" fill="#FFFFFF"></path></g></svg>',
            )}`})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: '100% 100%',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            // fontFamily: '"KosugiMaru-RegularNotoSansJP"',
          }}
        >
          <p style={{ fontSize: 50, textShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)' }}>{title}</p>
        </div>
      ),
      {
        width: 900,
        height: 600,
        // fonts: [
        //   {
        //     name: 'KosugiMaru-Regular',
        //     data: fontData,
        //     style: 'normal',
        //   },
        // ],
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
