import { FC, FormEvent } from "react";

export const Home: FC = () => {
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const testValue = (event.target as HTMLFormElement).test.value;
    const invokeValue = await window.Main.invokeValue(testValue);

    console.log({ invokeValue });
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="test">
          <input type="text" id="test" name="test" placeholder="test" />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
