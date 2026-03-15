import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import MessageTable from "../../components/admin/MessageTable";
import { getMessages } from "../../services/messageService";

function AdminMessagesPage() {
  const [messagePage, setMessagePage] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);

    getMessages(page, size)
      .then(({ data }) => {
        if (active) {
          setMessagePage(data);
          setError("");
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || "Unable to load messages.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [page, size]);

  if (loading) {
    return <Loader label="Loading messages..." />;
  }

  return (
    <section className="admin-panel">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow">Messages</span>
          <h1>Contact submissions</h1>
        </div>

        <label className="page-size-control">
          Page size
          <select value={size} onChange={(event) => setSize(Number(event.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      {error && <div className="form-status form-status-error">{error}</div>}

      <MessageTable messages={messagePage?.content || []} />

      <div className="pagination-row">
        <button
          className="button button-secondary"
          disabled={page === 0}
          onClick={() => setPage((current) => current - 1)}
          type="button"
        >
          Previous
        </button>
        <span>
          Page {messagePage?.page + 1 || 1} of {messagePage?.totalPages || 1}
        </span>
        <button
          className="button button-secondary"
          disabled={messagePage?.last || !messagePage?.totalPages}
          onClick={() => setPage((current) => current + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default AdminMessagesPage;
