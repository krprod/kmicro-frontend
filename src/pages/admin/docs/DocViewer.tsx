
interface DocViewerProps {
  title: string;
  url: string; // The URL to the HTML page (e.g., /swagger-ui/index.html)
}

const DocViewer: React.FC<DocViewerProps> = ({ title, url }) => {


  return (
//     <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <div style={{ width: "100%", overflowY: "auto", height:  '100vh' ,overflow: 'hidden'}}>
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        style={{ border: '2px solid #ccc', borderRadius: '8px' }}
        // Security best practice:
        sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default DocViewer;
