export default function Settings({ children }) {
  return (
    <div id="settings">
      {children}
      <style jsx>{`
        #settings {
          display: flex;
          justify-content: end;
          flex-wrap: wrap;
          padding: 10px 0;
        }
      `}</style>
    </div>
  );
}
