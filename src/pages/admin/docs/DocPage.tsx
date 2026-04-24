import{ useCallback, useState } from 'react'
import DocViewer from './DocViewer';
import conf from '@/common/config';

// const TABS = ["Users","Users-Kafka", "Orders","Orders-Kafka", "Products", "Notifications", "Notifications-Kafka"] as const;
const TABS = ["Common","Users-Kafka","Orders-Kafka","Notifications-Kafka"] as const;

const Docklinks = {
        "Common": { kafka:`${conf.commonUrl}/webjars/swagger-ui/index.html`},
        "Users": { kafka:`${conf.commonUrl}/user-service/springwolf/asyncapi-ui.html`},
        "Orders": { kafka:`${conf.commonUrl}/order-service/springwolf/asyncapi-ui.html`},
        "Notifications": {kafka:`${conf.commonUrl}/notification-service/springwolf/asyncapi-ui.html`}
}
function DocPage() {
        const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Common");
        
        const getDocUrl = useCallback(() => {
                const docInfo = Docklinks[activeTab.split("-")[0] as keyof typeof Docklinks];

                if (!docInfo) return "";
                return activeTab.includes("Kafka") ? docInfo.kafka : docInfo.kafka  ;
        }, [activeTab]);

        const path = getDocUrl();
  return (
    <div>
         <div className="flex flex-wrap gap-4 border-b">
                        {TABS.map((tab) => (
                        <button
                        key={tab}
                        type="button"
                        onClick={() => {setActiveTab(tab); }}
                        className={`border-b-2 px-3 py-2 text-sm ${
                        activeTab === tab ? "border-teal-700 text-teal-700" : "border-transparent text-gray-500"
                        }`}
                        >
                        {tab}
                        </button>
                        ))}
      </div>
      <div>
        {/* http://localhost:8091/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config */}
        {/* <DocViewer title={"true"} url={`${conf.commonUrl}/webjars/swagger-ui/index.html`} /> */}
        <DocViewer title={activeTab} url={path} />
      </div>
</div>
  )
}

export default DocPage