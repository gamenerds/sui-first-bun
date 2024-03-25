export default function BaseHTML() {
  return (
    <html lang="en">
      <head>
      <script
      src="https://unpkg.com/htmx.org@1.9.10"
      integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
      crossorigin="anonymous"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>My First Sui-t Bun</title>
      </head>
      <body>
        <div class="flex justify-center p-4">
          <form hx-post="/coins" hx-target="#results">
            <input name="address" type="text" class="border pl-1 pr-1"></input>
            <button type="submit" class="ml-4 border pl-2 pr-2">Check if They Chose Rich</button>
          </form>
        </div>
        <div id="results" class="flex justify-center"></div>
      </body>
    </html>
  )
}