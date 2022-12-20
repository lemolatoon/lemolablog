import {
  SupabaseClient,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Post } from "../types/supabase";

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
        .select(`title, post_id`);

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

export const useFetchHtmlByPostId =
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
