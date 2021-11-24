import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { FONTS } from '../constanst';

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {FONTS.map((font) => (
            <link
              key={font.href}
              rel={font.rel}
              as={font.as}
              href={font.href}
              type={font.type}
              crossOrigin={font.crossOrigin}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
