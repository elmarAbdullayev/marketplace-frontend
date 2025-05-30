

function newadvertisement() {
  return (
    <div className="new-advertisement">
      <h1>Create a New Advertisement</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <label>
          Description:
          <textarea name="description" required></textarea>
        </label>
        <label>
          Price:
          <input type="number" name="price" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default newadvertisement;