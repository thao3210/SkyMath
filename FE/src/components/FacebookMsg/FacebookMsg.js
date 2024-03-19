'use client';

import React from "react";
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMsg = () => {
    return (
        <section>
            <FacebookProvider appId="1947430409049052" chatSupport>
                <CustomChat pageId="271597389367377" minimized={false} />
            </FacebookProvider>
        </section>
    );
}

export default FacebookMsg;