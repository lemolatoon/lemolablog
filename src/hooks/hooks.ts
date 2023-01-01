import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "../types/supabase";
import { v4 as uuidv4 } from "uuid";

type Debounce = (fn: () => void) => void;

export const useDebounce = (timeout: number): Debounce => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounce: Debounce = useCallback(
    (fn) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn();
      }, timeout);
    },
    [timeout]
  );
  return debounce;
};

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const isClose = !isOpen;

  return { onToggle, onOpen, onClose, isOpen, isClose };
};

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type PublicSupabaseClient = SupabaseClient<any, "public", any>;
// fetch blog data
export const useFetchBlogTitles =
  () => async (supabase: PublicSupabaseClient) => {
    try {
      const { data, error, status } = await supabase
        .from("blogs")
        .select(`title, post_id`)
        .eq("is_public", true);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return { data: data as Pick<Post, "title" | "post_id">[] };
      }
    } catch (err) {
      alert("error fetching blog titles!");
      console.log(err);
    }
    return { data: null };
  };

export const useFetchBlogByPostId = () => async (post_id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  setLoading(true);

  try {
    const { data, error, status } = await supabase
      .from("blogs")
      .select(`raw_markdown, converted_html`)
      .eq("post_id", post_id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return {
        data: data as Pick<Post, "raw_markdown" | "converted_html">,
        loading,
      };
    }
  } catch (err) {
    alert("error fetching blog data!");
  } finally {
    setLoading(false);
  }
  return { data: null, loading };
};

export const useFetchTitleAndHtmlByPostId =
  () => async (supabase: PublicSupabaseClient, post_id: number) => {
    try {
      const { data, error, status } = await supabase
        .from("blogs")
        .select(`title, converted_html`)
        .eq("post_id", post_id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data as Pick<Post, "title" | "converted_html">;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

export const useFetchTitleByPostId =
  () => async (supabase: PublicSupabaseClient, post_id: number) => {
    try {
      const { data, error, status } = await supabase
        .from("blogs")
        .select(`title`)
        .eq("post_id", post_id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        return data as Pick<Post, "title">;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

export const usePostedTitles = () => {
  const supabase = useSupabaseClient();
  const fetchBlogTitles = useFetchBlogTitles();
  const [loading, setLoading] = useState(false);
  const [pastTitles, setPastTitles] = useState<
    Pick<Post, "title" | "post_id">[] | null
  >(null);
  useEffect(() => {
    (async () => {
      const { data } = await fetchBlogTitles(supabase);
      setPastTitles(data);
      setLoading(loading);
    })();
  }, [supabase]);
  return { titles: pastTitles };
};

export const useHtmlToMarkdown = (markdown: string) => {
  const [html, setHtml] = useState<string>("");
  const debounce = useDebounce(1000);
  useEffect(() => {
    debounce(() => setHtmlFromMarkdown(markdown));
  }, [markdown]);
  const setHtmlFromMarkdown = async (markdown: string) => {
    const options = {
      body: JSON.stringify({
        markdown: markdown,
      }),
      method: "POST",
    };
    const res = await fetch("/api/markdownToHtml", options);
    if (res.status === 200 && res.body) {
      const html = ((await res.json()) as { html: string }).html;
      setHtml(html);
    }
  };
  return html;
};

export const useUploadImageToSupabaseAndGetUrl = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const upload = async (supabase: PublicSupabaseClient, file: File) => {
    setUploading(true);
    try {
      const uuid = uuidv4();
      const filename = `public/${uuid}.png`;
      const { data, error } = await supabase.storage
        .from("lemolablog-images")
        .upload(filename, file);
      if (error || !data) {
        console.error(error);
        return null;
      }
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("lemolablog-images")
        .getPublicUrl(filename);
      console.log(publicUrl);
      setUrl(publicUrl);
    } catch (error) {
      console.error(error);
      setUrl(null);
    } finally {
      setUploading(false);
    }
  };
  const onFinishedApply = () => {
    setUrl(null);
    setUploading(false);
  };
  return { uploading, upload, url, onFinishedApply };
};
